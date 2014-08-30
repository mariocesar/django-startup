# coding=utf-8
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

from django.views.generic import TemplateView

urlpatterns = patterns(
    '',
    url(r'^admin/docs/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('startup.accounts.urls')),
    url(r'^privacy/$', TemplateView.as_view(template_name='privacy.html'), name='privacy_page'),
    url(r'^terms/$', TemplateView.as_view(template_name='terms.html'), name='terms_page'),

    url(r'^$', TemplateView.as_view(template_name='landing.html'), name='landing'),
)

if settings.DEBUG:
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    from django.conf.urls.static import static

    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
