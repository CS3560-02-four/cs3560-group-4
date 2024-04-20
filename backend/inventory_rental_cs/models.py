from django.db import models

class Account():
    def __init__(self, id, username, password, email, first_name, last_name, address, admin, student, status='normal', balance=0):
        self.id = id
        self.username = username
        self.password = password
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.address = address
        self.admin = admin
        self.student = student
        self.status = status
        self.balance = balance

# EXAMPLE DAO DESIGN WITH ITEM CLASS    
# THIS ITEM CLASS IS AN ENTITY AND ONLY HOLDS DATA    
class Item():
    def __init__(self, id, name, descritpion, category):
        self.id = id
        self.name = name
        self.description = descritpion
        self.category = category


class CartItem():
    def __init__(self, id, item_id, account_id, quantity):
        self.id = id
        self.item_id = item_id
        self.account_id = account_id
        self.quantity = quantity


class Rental():
    def __init__(self, id, status, pickup_date_time, return_date_time, student_id):
        self.id = id
        self.status = status
        self.pickup_date_time = pickup_date_time
        self.return_date_time = return_date_time
        self.student_id = student_id


class ItemUnit():
    def __init__(self, id, rental_id, item_id, status):
        self.id = id
        self.rental_id = rental_id # null if not associated with rental
        self.item_id = item_id
        self.status = status

    