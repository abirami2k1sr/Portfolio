# AI Interaction Guidelines

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification

## Workflow

This is the common workflow that we will use for every single feature/fix:

1. **Document** — Document the feature in `@context/current-feature.md`
2. **Branch** — Create a new branch for the feature/fix
3. **Implement** — Implement what is described in `@context/current-feature.md`
4. **Test** — Verify it works in the browser. Run `npm run build` and fix any errors
5. **Iterate** — Iterate and change things if needed
6. **Commit** — Only after build passes and everything works
7. **Merge** — Merge to main
8. **Delete Branch** — Delete branch after merge
9. **Review** — Review AI-generated code periodically and on demand
10. Mark as completed in `@context/current-feature.md` and add to history

Do NOT commit without permission and until the build passes. If build fails, fix the issues first.

## Branching

Create a new branch for every feature/fix. Name branches `feature/[feature]` or `fix/[fix]`. Ask to delete the branch once merged.

## Commits

- Ask before committing (don't auto-commit)
- Use conventional commit messages (`feat:`, `fix:`, `chore:`, `style:`, `refactor:`, etc.)
- Keep commits focused (one feature/fix per commit)
- Never put "Generated with Claude" in the commit messages

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase

## Code Review

Review AI-generated code periodically, especially for:

- Accessibility (semantic HTML, alt text, focus states, `prefers-reduced-motion`)
- Performance (unnecessary re-renders, bundle size, image sizes)
- Logic errors (edge cases)
- Patterns (matches existing codebase?)
