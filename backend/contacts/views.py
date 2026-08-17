from rest_framework import viewsets
from .models import Contact
from .serializers import ContactSerializer

class ContactViewSet(viewsets.ModelViewSet):
    serializer_class = ContactSerializer

    def get_queryset(self):
        # Privacy filter: Only return contacts that belong to the logged-in user
        return Contact.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Secure assignment: Automatically set the logged-in user as the owner
        serializer.save(owner=self.request.user)
