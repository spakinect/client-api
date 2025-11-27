# Troubleshooting

## "Hook useColorMode is called outside the ColorModeProvider" Error

### Problem
When navigating to the API Reference page, you may see an error:
```
Hook useColorMode is called outside the <ColorModeProvider>. 
Please see https://docusaurus.io/docs/api/themes/configuration#use-color-mode.
```

### Root Cause
This error occurs when multiple versions of Docusaurus packages are installed simultaneously. Specifically, `redocusaurus@2.5.0` can pull in newer Docusaurus dependencies (e.g., 3.9.x) while your main project uses 3.8.1. This creates two separate instances of the `ColorModeProvider`, causing the context mismatch.

### Solution
The issue has been resolved by:

1. **Adding `overrides` in package.json** to force all Docusaurus packages to use version 3.8.1:
   ```json
   "overrides": {
     "@docusaurus/core": "3.8.1",
     "@docusaurus/theme-common": "3.8.1",
     "@docusaurus/types": "3.8.1",
     "@docusaurus/plugin-content-docs": "3.8.1",
     "@docusaurus/mdx-loader": "3.8.1",
     "@docusaurus/module-type-aliases": "3.8.1",
     "@docusaurus/utils": "3.8.1"
   }
   ```

2. **Adding `.npmrc` file** with `legacy-peer-deps=true` to handle peer dependency conflicts.

### Verifying the Fix
To verify all packages use the same Docusaurus version:
```bash
npm list @docusaurus/theme-common @docusaurus/core
```

You should see `3.8.1 overridden` or `3.8.1 deduped` for all packages.

### If the Issue Reappears
If you encounter this issue again after reinstalling dependencies:

1. Delete `node_modules` and `package-lock.json`:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Reinstall dependencies:
   ```bash
   npm install
   ```
   
   Or if you don't have `.npmrc`:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Verify the fix as described above.

### Related Issue in emr-api
The emr-api documentation site has been updated with the same `overrides` and `.npmrc` configuration as a preventive measure, though it wasn't experiencing the issue.

