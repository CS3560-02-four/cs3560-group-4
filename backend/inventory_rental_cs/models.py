class Account():
    def __init__(self, id, username, password, email, first_name, last_name, address, admin, student, status, balance):
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
    def __init__(self, id, name, descritpion, quantity, category):
        self.id = id
        self.name = name
        self.description = descritpion
        self.quantity = quantity
        self.category = category


class CartItem():
    def __init__(self, id, item_id, student_id, quantity):
        self.id = id
        self.item_id = item_id
        self.student_id = student_id
        self.quantity = quantity


class Rental():
    #Comment on datetimes: we will use a date time object instead of a raw string, and use a toString(or whatever it's called)
    #method so that every date time has the same format in the DB
    def __init__(self, id, pickup_date_time, return_date_time, status, studentId):
        self.id = id
        self.pickup_date_time = pickup_date_time
        self.return_date_time = return_date_time
        self.status = status
        self.studentId = studentId

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [Rental()]

    #Update the account in the DB
    def update(self, pickup_date_time = None, return_date_time = None, status = None, studentId = None):
        pass

    #Archive
    def delete(self):
        pass

class RentalItem():
    def __init__(self, id, status, itemId, rentalId):
        self.id = id
        self.status = status
        self.itemId = itemId
        self.rentalId = rentalId

    #Create an account in DB
    #Uses this class instance's fields
    def create(self):
        pass

    #Static: read from the database based on arguments and return an instance of this class
    #A separate function to build the SQL query from kwargs will be used
    @staticmethod
    def read(**kwargs) -> list:
        return [RentalItem()]

    #Update the account in the DB
    def update(self, status = None, itemId = None, rentalId = None):
        pass

    #Archive
    def delete(self):
        pass
