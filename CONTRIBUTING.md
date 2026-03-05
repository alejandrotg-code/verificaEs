# Contributing to ValidaES 🇪🇸

Thank you for your interest in contributing! Here's how to get started.

---

## 🛠️ Local setup

1. Clone the repository
```bash
git clone https://github.com/alejandrotg-code/verificaEs
cd verificaEs
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Start the server
```bash
uvicorn app.main:app --reload
```

4. Run the tests
```bash
pytest tests/ --rootdir=.
```

---

## 🌿 Workflow

1. Fork the repository
2. Create a new branch for your contribution
```bash
git checkout -b feat/your-feature-name
```
3. Make your changes
4. Make sure all tests pass
```bash
pytest tests/ --rootdir=.
```
5. Commit your changes following our convention (see below)
6. Open a Pull Request

---

## 📝 Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | When to use |
|---|---|
| `feat` | New feature or endpoint |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `test` | Adding or updating tests |
| `refactor` | Code restructuring |
| `chore` | Maintenance tasks |

Example:
```
git commit -m "feat: add CIF validation"
```

---

## 📁 Project structure

```
verificaEs/
├── app/
│   ├── main.py              
│   ├── routers/             # API endpoints
│   └── validators/          # Validation logic
├── tests/                   # Unit tests
├── requirements.txt
└── README.md
```

---

## ✅ Guidelines

- Every new validator must have its corresponding tests in `tests/`
- Validators go in `app/validators/`
- Endpoints go in `app/routers/`
- Keep functions small and focused on one thing
- No external libraries for validation logic — pure Python only

---

## 🤝 Code of conduct

- Be respectful and inclusive
- Constructive feedback only
- Any form of harassment will not be tolerated

---

## ❓ Questions

Open an issue and we'll be happy to help!