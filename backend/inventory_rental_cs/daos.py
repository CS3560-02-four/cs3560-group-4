from django.db import connection

class ItemDao:

    def insertItem():
        cursor = connection.cursor()
        cursor.execute("INSERT INTO item (name, description, quantity, category) VALUES ('HP Laptop', 'shitty ahh laptop', 30, 'Laptops')")

    def getAllItems():
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM item")
        return cursor.fetchall()