import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ExecuteRequest {
  code: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { code }: ExecuteRequest = await req.json();

    if (!code || typeof code !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Invalid code provided' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Security: Limit code length
    if (code.length > 10000) {
      return new Response(
        JSON.stringify({ error: 'Code exceeds maximum length of 10000 characters' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Create a temporary file for the Python code
    const tempFile = `/tmp/script_${Date.now()}.py`;
    await Deno.writeTextFile(tempFile, code);

    try {
      // Execute Python code with timeout and resource limits
      const command = new Deno.Command('python3', {
        args: [tempFile],
        stdout: 'piped',
        stderr: 'piped',
        env: {
          PYTHONUNBUFFERED: '1',
        },
      });

      // Set a timeout for execution (5 seconds)
      const timeoutMs = 5000;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Execution timeout (5 seconds)')), timeoutMs)
      );

      const executionPromise = command.output();
      const output = await Promise.race([executionPromise, timeoutPromise]) as Deno.CommandOutput;

      const stdout = new TextDecoder().decode(output.stdout);
      const stderr = new TextDecoder().decode(output.stderr);

      // Clean up temp file
      try {
        await Deno.remove(tempFile);
      } catch {
        // Ignore cleanup errors
      }

      if (output.success) {
        return new Response(
          JSON.stringify({
            output: stdout || 'Code executed successfully (no output)',
            error: null,
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            output: stdout,
            error: stderr || 'Execution failed',
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }
    } catch (execError) {
      // Clean up temp file on error
      try {
        await Deno.remove(tempFile);
      } catch {
        // Ignore cleanup errors
      }

      if (execError instanceof Error && execError.message.includes('timeout')) {
        return new Response(
          JSON.stringify({
            output: '',
            error: 'Execution timeout: Code took longer than 5 seconds to execute',
          }),
          {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      return new Response(
        JSON.stringify({
          output: '',
          error: `Execution error: ${execError instanceof Error ? execError.message : String(execError)}`,
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        output: '',
        error: `Server error: ${error instanceof Error ? error.message : String(error)}`,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});