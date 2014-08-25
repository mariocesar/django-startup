# coding=utf-8
from django.conf.urls import patterns, url, include
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse_lazy
from django.views.generic import RedirectView

from startup.accounts.views import DetailUser, UpdateUser, CreateUser


urlpatterns = patterns(
    '',
    url(r'^$', login_required(RedirectView.as_view(url=reverse_lazy('account_detail'), permanent=False))),
    url(r'^create/$', CreateUser.as_view(), name='account_create'),
    url(r'^detail/$', DetailUser.as_view(), name='account_detail'),
    url(r'^update/$', UpdateUser.as_view(), name='account_update'),
    url(r'', include('django.contrib.auth.urls')),
)

