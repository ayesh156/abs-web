# Absterco Admin Tools

This directory contains all administrative scripts for managing Firebase authentication and admin users in the Absterco Web application.

## Scripts

### `setup-admin.js`
**Primary admin setup script** - Use this for setting admin claims on existing users.

```bash
node scripts/setup-admin.js <email>
```

**Example:**
```bash
node scripts/setup-admin.js admin@absterco.com
```

### `set-admin-claims.js`
**Legacy admin claims script** - Sets admin claims for a hardcoded email (admin@absterco.com).

```bash
node scripts/set-admin-claims.js
```

### `test-auth-config.js`
**Authentication configuration tester** - Validates Firebase setup and checks admin users.

```bash
node scripts/test-auth-config.js
```

## Usage

1. **Setting up a new admin user:**
   ```bash
   cd tools
   node scripts/setup-admin.js newadmin@absterco.com
   ```

2. **Testing your Firebase configuration:**
   ```bash
   cd tools
   node scripts/test-auth-config.js
   ```

3. **Quick admin setup for default user:**
   ```bash
   cd tools
   node scripts/set-admin-claims.js
   ```

## Requirements

- Node.js installed
- Proper `.env` configuration with Firebase Admin credentials
- Firebase project with Authentication enabled

---

**Note:** All scripts must be run from the project root or tools directory to access the `.env` file properly.