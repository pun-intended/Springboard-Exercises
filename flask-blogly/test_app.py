from unittest import TestCase
from app import app
from models import db, User, connect_db

class TestRoutes(TestCase):
    def setUp(self):
        """Fill database with example users"""
        user1 = User(id=500, first_name="Test", last_name="User1", img_url="/static/m0.jpeg")
        db.session.add(user1)
        db.session.commit()

    
    def tearDown(self):
        """Clear example users"""
        User.query.filter_by(id=500).delete()
        db.session.commit()

    def test_users(self):
        """Test that example user appears on directory page"""
        with app.test_client() as client:
            resp = client.get("/users")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Test User1", html)



    def test_user_page(self):
        """Test that user page displays correct user information"""
        with app.test_client() as client:
            resp = client.get("/users/500")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Test User1", html)

    def test_edit_post(self):
        """Test that edits to user data changes are reflected"""
        with app.test_client() as client:
            client.post("/users/new", data={'firstName': 'Test', 'lastName': 'user2', 'imgUrl': '/static/f2.jpeg'})
            resp2 = client.get("/users")
            html = resp2.get_data(as_text=True)

            self.assertIn("Test user2", html)

    def test_delete_user(self):
        """Test that deletions are executed"""
        with app.test_client() as client:
            resp = client.post("/users/500/delete")
            html = resp.get_data(as_text=True)

            self.assertNotIn("Test user1", html)

