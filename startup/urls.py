# coding=utf-8
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = patterns(
    '',
    url(r'^admin/docs/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('startup.accounts.urls')),
    url(r'^$', TemplateView.as_view(template_name='landing.html'), name='landing'),
)
