# coding=utf-8
from .base import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG

INSTALLED_APPS += (
    'debug_toolbar',
)

# Host and Port to use with `maildump`
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025

try:
    from .local import *
except ImportError:
    pass