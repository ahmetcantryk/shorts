# CLAUDE.md - AI Assistant Guide

**Repository**: shorts
**Owner**: ahmetcantryk
**Last Updated**: 2025-11-30
**Status**: New Project / Initial Setup

## Table of Contents

1. [Project Overview](#project-overview)
2. [Repository Structure](#repository-structure)
3. [Development Workflow](#development-workflow)
4. [Git Conventions](#git-conventions)
5. [Code Conventions](#code-conventions)
6. [AI Assistant Guidelines](#ai-assistant-guidelines)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Project Overview

### Current State
This is a **new repository** with no existing codebase. The project is in the initial setup phase.

### Project Name
**shorts** - The specific purpose and technology stack will be defined as development progresses.

### Key Information
- **Repository Type**: Git
- **Platform**: Linux
- **Branch Naming Convention**: `claude/claude-md-*` for AI assistant branches

---

## Repository Structure

### Current Structure
```
shorts/
├── .git/           # Git repository metadata
└── CLAUDE.md       # This file - AI assistant guide
```

### Planned Structure
As the project develops, update this section with:
- Source code directories
- Configuration files
- Documentation
- Test directories
- Build artifacts locations

**TODO**: Update this section as files and directories are added.

---

## Development Workflow

### Branch Strategy

#### Main Branch
- **Name**: TBD (typically `main` or `master`)
- **Purpose**: Production-ready code
- **Protection**: Direct pushes may be restricted

#### Feature Branches
- **Pattern**: `claude/claude-md-<session-id>-<unique-id>`
- **Example**: `claude/claude-md-mil5ordgnemwjniq-015GYiGki7mJ1MHEHvRV36xt`
- **Purpose**: Development work by AI assistants
- **Lifecycle**: Created → Developed → Pushed → Pull Request → Merged

### Development Process

1. **Start Work**
   - AI assistant creates or checks out designated feature branch
   - Branch follows naming convention: `claude/claude-md-*`

2. **Make Changes**
   - Implement requested features or fixes
   - Follow code conventions (see below)
   - Write clear, descriptive commit messages

3. **Commit Work**
   - Stage relevant files only
   - Use descriptive commit messages
   - Commit early and often

4. **Push Changes**
   - Always use: `git push -u origin <branch-name>`
   - Branch must start with `claude/` and match session ID
   - Retry on network errors (up to 4 times with exponential backoff)

5. **Create Pull Request**
   - Use GitHub's web interface or `gh` CLI if available
   - Provide clear PR description
   - Reference related issues

---

## Git Conventions

### Commit Messages

Follow conventional commit format:

```
<type>: <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements

**Examples**:
```
feat: add user authentication module

Implement JWT-based authentication with login and registration endpoints.
Includes password hashing and token validation.

Closes #123
```

```
fix: resolve null pointer exception in data processor

Add null checks before accessing user object properties.
```

### Branch Protection

- **Never** force push to main/master
- **Never** push to wrong branch without permission
- **Always** verify branch name before pushing
- **Critical**: Branch must match session ID pattern

### Git Operations Best Practices

**For Pushing**:
```bash
git push -u origin <branch-name>
# Retry logic: 2s, 4s, 8s, 16s on network failures
```

**For Fetching**:
```bash
git fetch origin <branch-name>
# Retry up to 4 times with exponential backoff
```

**For Pulling**:
```bash
git pull origin <branch-name>
```

---

## Code Conventions

### General Principles

1. **Keep It Simple**
   - Avoid over-engineering
   - Don't add features not explicitly requested
   - Don't refactor code unnecessarily
   - Only add what's needed for current task

2. **Security First**
   - Avoid OWASP Top 10 vulnerabilities
   - No command injection, XSS, SQL injection
   - Validate input at system boundaries
   - Don't over-validate internal code

3. **No Premature Optimization**
   - Don't create abstractions for single-use code
   - Three similar lines are better than premature abstraction
   - Don't design for hypothetical future requirements

4. **Clean Code**
   - Only add comments where logic isn't self-evident
   - Don't add docstrings to unchanged code
   - Remove unused code completely (no `_var` or `// removed` hacks)

### File Operations

- **Read First**: Always read files before suggesting modifications
- **Edit > Write**: Prefer editing existing files over creating new ones
- **No Unnecessary Files**: Don't create documentation unless requested

### Error Handling

- Only validate at system boundaries (user input, external APIs)
- Trust internal code and framework guarantees
- Don't add error handling for scenarios that can't happen

---

## AI Assistant Guidelines

### Before Starting Any Task

1. **Read Existing Code**
   - Never propose changes to unread code
   - Understand context before modifying
   - Check for existing patterns and conventions

2. **Plan Complex Tasks**
   - Use TodoWrite tool for multi-step tasks
   - Break down complex work into steps
   - Track progress and mark todos complete

3. **Ask When Unclear**
   - Clarify ambiguous requirements
   - Confirm architectural decisions
   - Verify assumptions before implementing

### During Development

1. **Use Appropriate Tools**
   - Glob: Find files by pattern
   - Grep: Search code content
   - Read: Read file contents
   - Edit: Modify existing files
   - Write: Create new files (sparingly)
   - Bash: Run commands (not for file ops)

2. **Parallel Operations**
   - Run independent operations in parallel
   - Use sequential operations when there are dependencies
   - Example: Read multiple files in parallel

3. **Communication**
   - Output text directly to user
   - Never use bash echo to communicate
   - Keep responses concise
   - Use markdown formatting

### After Completing Work

1. **Verify Changes**
   - Run tests if they exist
   - Check build if applicable
   - Review git status

2. **Commit Properly**
   - Stage only relevant files
   - Write clear commit messages
   - Don't commit secrets or credentials

3. **Push Correctly**
   - Verify branch name matches pattern
   - Use correct push command
   - Handle network errors appropriately

---

## Common Tasks

### Initial Project Setup

When setting up a new project:

1. Determine project type and technology stack
2. Create appropriate directory structure
3. Initialize configuration files (package.json, etc.)
4. Set up version control (.gitignore)
5. Create initial documentation (README.md)
6. Update this CLAUDE.md with project specifics

### Adding a New Feature

1. Read relevant existing code
2. Plan implementation with TodoWrite
3. Implement changes following conventions
4. Test the feature
5. Commit with descriptive message
6. Push to feature branch

### Fixing a Bug

1. Understand the bug (read code, review error)
2. Locate root cause
3. Implement minimal fix
4. Verify fix works
5. Don't refactor surrounding code
6. Commit and push

### Updating Documentation

1. Read existing documentation
2. Make necessary updates
3. Keep it concise and accurate
4. Update this CLAUDE.md when structure changes
5. Commit and push

---

## Troubleshooting

### Git Push Fails with 403

**Problem**: Branch name doesn't match required pattern
**Solution**: Ensure branch starts with `claude/` and ends with matching session ID

### Network Errors During Git Operations

**Problem**: Intermittent network failures
**Solution**: Retry with exponential backoff (2s, 4s, 8s, 16s)

### File Not Found Errors

**Problem**: Trying to access non-existent files
**Solution**: Use Glob to find files first, verify paths before reading

### Empty Repository

**Problem**: No commits or branches exist
**Solution**: Create initial commit before pushing to remote

---

## Maintenance

### Updating This Document

Update CLAUDE.md when:
- Project structure changes significantly
- New conventions are established
- Technology stack is defined or changes
- Common issues are discovered
- Workflow processes are modified

### Review Schedule

- After initial project setup
- After major architectural changes
- When onboarding new AI assistants
- Monthly for active projects
- As needed for issues or confusion

---

## Notes for Future Updates

This is a **template CLAUDE.md** for a new repository. As the project develops:

1. **Define Project Purpose**: Replace generic descriptions with specific project goals
2. **Technology Stack**: Document languages, frameworks, libraries used
3. **Directory Structure**: Update with actual project structure
4. **Build & Test**: Add build commands, test procedures
5. **Dependencies**: Document how to install and manage dependencies
6. **Environment Variables**: List required environment variables
7. **Deployment**: Add deployment procedures if applicable
8. **API Documentation**: Link to or include API docs
9. **Database Schema**: Document database structure if applicable
10. **External Services**: List third-party services and integrations

---

**End of CLAUDE.md**
*This document is a living guide. Keep it updated as the project evolves.*
