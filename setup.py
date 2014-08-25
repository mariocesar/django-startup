# coding: utf8

import os
from email.utils import parseaddr

from setuptools import setup, find_packages


here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.rst')).read()

author, author_email = parseaddr("Mario César Señoranis Ayala <mariocesar@creat1va.com>")
version = "0.1"
url = 'http://github.com/mariocesar/django-startup'

setup(
    name='django-startup',
    url=url,
    version=version,
    description=README.split('\n\n')[0],
    long_description=README,
    classifiers=[
        "Programming Language :: Python",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
    ],
    author=author,
    author_email=author_email,
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'setuptools',
    ],
    zip_safe=False,
)
