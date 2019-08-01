module.exports = {
  list: ["chore", "fix", "refactor", "feat", "test", "doc", "format", "ci"],
  maxMessageLength: 64,
  minMessageLength: 3,
  commitMessageFormat: "<type>: <emoji>  <subject>",
  questions: ["type", "subject", "body"],
  types: {
    chore: {
      description: "Small and boring change required for something else",
      emoji: "🤖",
      value: "chore"
    },
    ci: {
      description: "Change CI or build process",
      emoji: "🛠",
      value: "ci"
    },
    doc: {
      description: "Change documentation",
      emoji: "📘",
      value: "doc"
    },
    docker: {
      description: "Change Docker stuff",
      emoji: "🐳",
      value: "docker"
    },
    feat: {
      description: "Introduce a new feature",
      emoji: "⭐️",
      value: "feat"
    },
    fix: {
      description: "Fix a bug",
      emoji: "🐞",
      value: "fix"
    },
    perf: {
      description: "Improve performance",
      emoji: "⚡️",
      value: "perf"
    },
    refactor: {
      description: "Improve existing code",
      emoji: "♻️",
      value: "refactor"
    },
    release: {
      description: "Create a release commit",
      emoji: "🚚",
      value: "release"
    },
    format: {
      description: "Improve code lint or style",
      emoji: "🎨",
      value: "format"
    },
    test: {
      description: "Add or update a test",
      emoji: "🔍",
      value: "test"
    }
  }
}
