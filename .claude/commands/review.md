Review the code that was just generated or modified in this session.

## Review Checklist

For each file that was created or modified, check:

### Correctness
- Does the code do what it's supposed to do?
- Are there any logic errors or edge cases not handled?
- Does it integrate correctly with existing code?

### React Best Practices
- Are hooks used correctly (dependencies, rules of hooks)?
- Is state managed appropriately (local vs store)?
- Are components properly memoized where needed?
- Are event handlers defined correctly (no inline functions causing rerenders)?

### Styled Components
- Do styles follow the existing theme patterns?
- Are responsive breakpoints handled via `device` media queries?
- Are transient props prefixed with `$`?

### Store Integration
- Is Zustand store used correctly?
- Are selectors efficient?
- Is persistence configured properly?

### Accessibility
- Are ARIA labels present where needed?
- Is keyboard navigation supported?
- Are focus states visible?

### Code Quality
- Is the code DRY without over-abstraction?
- Are variable/function names clear?
- Is there any dead code or unused imports?

## Output Format

Provide a summary:
1. **Files Reviewed**: List of files
2. **Issues Found**: Any problems discovered
3. **Suggestions**: Improvements that could be made
4. **Verdict**: PASS / NEEDS CHANGES

If issues are found, fix them before proceeding.
