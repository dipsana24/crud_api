#!/bin/bash
# Backend setup script

echo "🐍 Setting up Django backend..."

cd "$(dirname "$0")"

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations tasks
python manage.py migrate

# Create superuser (optional, non-interactive)
echo "✅ Backend setup complete!"
echo ""
echo "To create a superuser run:"
echo "  source venv/bin/activate && python manage.py createsuperuser"
echo ""
echo "To start the server run:"
echo "  source venv/bin/activate && python manage.py runserver"
