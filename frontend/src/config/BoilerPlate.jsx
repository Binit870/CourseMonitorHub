// src/config/boilerplates.js

export const languageConfig = {
  javascript: {
    id: 63,
    ext: "js",
    template: `// JavaScript Boilerplate
function main() {
  console.log("Hello, World!");
}
main();`,
  },

  typescript: {
    id: 74,
    ext: "ts",
    template: `// TypeScript Boilerplate
function main(): void {
  console.log("Hello, World!");
}
main();`,
  },

  python: {
    id: 71,
    ext: "py",
    template: `# Python Boilerplate
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  },

  java: {
    id: 62,
    ext: "java",
    template: `// Java Boilerplate
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },

  c: {
    id: 50,
    ext: "c",
    template: `/* C Boilerplate */
#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },

  cpp: {
    id: 54,
    ext: "cpp",
    template: `/* C++ Boilerplate */
#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },

  csharp: {
    id: 51,
    ext: "cs",
    template: `// C# Boilerplate
using System;
class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
  },

  go: {
    id: 60,
    ext: "go",
    template: `// Go Boilerplate
package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
  },

  swift: {
    id: 83,
    ext: "swift",
    template: `// Swift Boilerplate
import Foundation
print("Hello, World!")`,
  },

  kotlin: {
    id: 78,
    ext: "kt",
    template: `// Kotlin Boilerplate
fun main() {
    println("Hello, World!")
}`,
  },

  ruby: {
    id: 72,
    ext: "rb",
    template: `# Ruby Boilerplate
puts "Hello, World!"`,
  },

  php: {
    id: 68,
    ext: "php",
    template: `<?php
// PHP Boilerplate
echo "Hello, World!\\n";
?>`,
  },

  rust: {
    id: 73,
    ext: "rs",
    template: `// Rust Boilerplate
fn main() {
    println!("Hello, World!");
}`,
  },

  r: {
    id: 80,
    ext: "r",
    template: `# R Boilerplate
print("Hello, World!")`,
  },

  scala: {
    id: 81,
    ext: "scala",
    template: `// Scala Boilerplate
object Main {
  def main(args: Array[String]): Unit = {
    println("Hello, World!")
  }
}`,
  },

  dart: {
    id: 90,
    ext: "dart",
    template: `// Dart Boilerplate
void main() {
  print("Hello, World!");
}`,
  },

  haskell: {
    id: 61,
    ext: "hs",
    template: `-- Haskell Boilerplate
main :: IO ()
main = putStrLn "Hello, World!"`,
  },

  perl: {
    id: 85,
    ext: "pl",
    template: `# Perl Boilerplate
print "Hello, World!\\n";`,
  },

  bash: {
    id: 46,
    ext: "sh",
    template: `# Bash Boilerplate
echo "Hello, World!"`,
  },

  sql: {
    id: 82,
    ext: "sql",
    template: `-- SQL Boilerplate
SELECT "Hello, World!";`,
  },

  objectivec: {
    id: 79,
    ext: "m",
    template: `// Objective-C Boilerplate
#import <Foundation/Foundation.h>
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"Hello, World!");
    }
    return 0;
}`,
  },
};
