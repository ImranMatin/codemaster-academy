/*
  # Add Java and C++ Starter Code Columns

  ## Changes
  
  ### 1. Add New Columns
    - Add `starter_code_java` column to coding_problems table
    - Add `starter_code_cpp` column to coding_problems table
  
  ### 2. Populate with Default Values
    - Set default starter code templates for existing problems
    - New problems can have custom starter code for each language
*/

-- Add Java starter code column
ALTER TABLE coding_problems 
ADD COLUMN IF NOT EXISTS starter_code_java text DEFAULT '// Java solution
class Solution {
    public void solve() {
        // Your code here
    }
}';

-- Add C++ starter code column
ALTER TABLE coding_problems 
ADD COLUMN IF NOT EXISTS starter_code_cpp text DEFAULT '// C++ solution
#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void solve() {
        // Your code here
    }
};';
