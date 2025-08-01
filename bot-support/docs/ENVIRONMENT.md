# Environment Configuration

## Quick Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and set your GitHub personal access token:
```bash
# Replace with your actual GitHub token
github.personal_access_token=your_actual_token_here
```

## GitHub Token Setup

Generate a GitHub personal access token at: https://github.com/settings/tokens

Required permissions:
- `repo` - Full control of private repositories
- `read:org` - Read organization data
- `read:user` - Read user data
- `read:project` - Read project data 