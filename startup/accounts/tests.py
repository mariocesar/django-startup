# coding=utf-
from django.core.urlresolvers import reverse
from django.test import TestCase
from django.test import Client

from startup.accounts.models import User


class AccountTestCase(TestCase):
    def test_signin(self):
        client = Client()
        response = client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)

        response = client.post(reverse('login'), {'username': 'wrong', 'password': 'wrong'})
        self.assertContains(response, 'Please correct the error below')

        User.objects.create_superuser(username='admin', email='admin@localhost', password='password')

        response = client.post(reverse('login'), {'username': 'admin', 'password': 'password'})
        self.assertRedirects(response, reverse('account_detail'))

    def test_signup(self):
        raise NotImplementedError('Test not implemented')

    def test_reset_password(self):
        raise NotImplementedError('Test not implemented')

    def test_change_password(self):
        raise NotImplementedError('Test not implemented')

    def test_update_account(self):
        raise NotImplementedError('Test not implemented')