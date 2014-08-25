# coding=utf-8

from django.views.generic import DetailView, UpdateView, CreateView
from django.contrib.auth import get_user_model

from startup.accounts.forms import UserCreationForm, UserUpdateForm


User = get_user_model()


class DetailUser(DetailView):
    model = User

    def get_object(self, queryset=None):
        return self.request.user


class CreateUser(CreateView):
    model = User
    form_class = UserCreationForm


class UpdateUser(UpdateView):
    model = User
    form_class = UserUpdateForm

    def get_object(self, queryset=None):
        return self.request.user
