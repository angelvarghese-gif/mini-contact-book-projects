from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    # Every contact must be linked to a specific user (owner)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    
    # Core contact details
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50, blank=True, null=True)
    company = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.owner.username})"

