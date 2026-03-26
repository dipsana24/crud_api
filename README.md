# 📋 TaskFlow — Django REST + React CRUD App

A full-stack task management app with a Django REST Framework backend and a React frontend.

---

## 🗂 Project Structure

```
crud_app/
├── backend/          # Django REST API
│   ├── backend/      # Django project settings, URLs
│   ├── tasks/        # Tasks app (model, views, serializers)
│   ├── manage.py
│   ├── requirements.txt
│   └── setup.sh
└── frontend/         # React app
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── TaskForm.js
    │   │   ├── TaskCard.js
    │   │   ├── StatsBar.js
    │   │   ├── FilterBar.js
    │   │   └── ConfirmDialog.js
    │   ├── api.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+

---

### 1. Backend (Django)

```bash
cd backend

# Create & activate virtual environment
python3 -m venv venv
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations tasks
python manage.py migrate

# (Optional) Create admin user
python manage.py createsuperuser

# Start server on http://localhost:8000
python manage.py runserver
```

---

### 2. Frontend (React)

Open a **new terminal** tab:

```bash
cd frontend

npm install

# Start dev server on http://localhost:3000
npm start
```

Open **http://localhost:3000** in your browser.

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api/`.

| Method   | URL                  | Description           |
|----------|----------------------|-----------------------|
| `GET`    | `/api/tasks/`        | List all tasks        |
| `POST`   | `/api/tasks/`        | Create a task         |
| `GET`    | `/api/tasks/{id}/`   | Get a single task     |
| `PUT`    | `/api/tasks/{id}/`   | Update a task         |
| `PATCH`  | `/api/tasks/{id}/`   | Partial update        |
| `DELETE` | `/api/tasks/{id}/`   | Delete a task         |
| `GET`    | `/api/tasks/stats/`  | Get task statistics   |

### Query Parameters (GET /api/tasks/)

| Param      | Example             | Description                    |
|------------|---------------------|--------------------------------|
| `status`   | `?status=todo`      | Filter by status               |
| `priority` | `?priority=high`    | Filter by priority             |
| `search`   | `?search=meeting`   | Search title & description     |
| `ordering` | `?ordering=-created_at` | Sort results               |

---

## 📦 Task Model

```json
{
  "id": 1,
  "title": "Finish report",
  "description": "Complete Q3 analysis",
  "priority": "high",
  "status": "in_progress",
  "due_date": "2025-04-01",
  "created_at": "2025-03-25T10:00:00Z",
  "updated_at": "2025-03-25T11:30:00Z"
}
```

**Priority values:** `low` · `medium` · `high`  
**Status values:** `todo` · `in_progress` · `done`

---

## 🛠 Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Backend   | Django 4.2, Django REST Framework 3.14 |
| Database  | SQLite (dev) — swap for PostgreSQL in production |
| Frontend  | React 18, Axios               |
| Fonts     | Syne, DM Sans (Google Fonts)  |
| CORS      | django-cors-headers           |

---

## 🔧 Environment Variables

### Frontend (`frontend/.env`)

```
REACT_APP_API_URL=http://localhost:8000/api
```

---

## 🏭 Production Notes

1. Set `DEBUG = False` and update `SECRET_KEY` in `settings.py`
2. Replace SQLite with PostgreSQL: update `DATABASES` in settings
3. Configure `ALLOWED_HOSTS` with your domain
4. Run `npm run build` for a production React bundle
5. Serve static files with Nginx or Whitenoise
6. (GitHub Pages) React is deployed from `frontend/build` via `.github/workflows/pages.yml`
7. (GitHub Pages) Live URL: `https://dipsana24.github.io/crud_api/`

---

## 📸 Features

- ✅ Full CRUD — Create, Read, Update, Delete tasks
- ✅ Filter by status & priority
- ✅ Search by title/description
- ✅ Sort by date, due date
- ✅ Inline status change per task card
- ✅ Stats bar (totals by status & priority)
- ✅ Overdue date warnings
- ✅ Confirm dialog before deletion
- ✅ Toast notifications
- ✅ Django Admin at `/admin/`
