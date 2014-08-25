# coding=utf-8
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import ugettext_lazy as _

from startup.accounts.models import User


class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'full_name', 'date_joined', 'last_login', 'is_active')
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email')
    date_hierarchy = 'date_joined'
    ordering = ('-date_joined',)
    fieldsets = (
        (None, {
            'fields': ('username', 'password')}),

        (_('Personal info'), {
            'fields': (('first_name', 'last_name'), 'email', 'photo')}),

        (_('Important dates'), {
            'fields': (('last_login', 'date_joined'),)}),

        (_('Permissions'), {
            'classes': ('collapse',),
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )


admin.site.register(User, UserAdmin)