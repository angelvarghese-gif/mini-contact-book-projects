from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        # The fields we expose to our React frontend
        fields = ['id', 'name', 'email', 'phone', 'company']
