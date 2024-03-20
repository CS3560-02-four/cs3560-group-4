from django.db import models

# Create your models here.
class Account(models.Model):
    username = models.CharField(max_length = 50)
    password = models.CharField(max_length = 50)
    email = models.EmailField()

class Student(Account):
    balance = models.DecimalField()
    status = models.CharField()

class Staff(Account):
    #Since Staff differs from Account only when it comes to user permissions,
    #only methods will be required here, without separate fields.
    #For now, an empty method is defined.
    def empty_method():
        return None
    
class Item(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 200)
    quantity = models.IntegerField()
    category = models.CharField()

class Cart(models.Model):
    studentId = models.ForeignKey(Student, on_delete = models.CASCADE)

class CartItem(models.Model):
    quantity = models.IntegerField()
    cartId = models.ForeignKey(Cart, on_delete = models.CASCADE)
    itemId = models.ForeignKey(Item, on_delete = models.CASCADE)

class Rental(models.Model):
    pickup_date_time = models.DateTimeField()
    return_date_time = models.DateTimeField()
    status = models.CharField()
    studentId = models.ForeignKey(Student, on_delete = models.CASCADE)

class RentalItem(models.Model):
    status = models.CharField()
    itemId = models.ForeignKey(Item, on_delete = models.CASCADE)
    rentalId = models.ForeignKey(Rental, on_delete = models.CASCADE)
