---
title: Resources
feature_text: |
  Resources for The Utah Digital Asset Association
feature_image: "/assets/blockchain.jpg"
excerpt: "Resources for The Utah Digital Asset Association"
aside: true
permalink: /resources/
---

Tools and resources for The Utah Digital Asset Association.
<h3 id="archive">Archive of all posts from The Utah Digital Asset Association:</h3>

<input type="text" id="search-input" placeholder="Search blog posts..">

<div id="search-index">
<ul id="results-container">

</ul>
</div>

<div id="post-index">
{% for post in site.posts %}
   {% assign currentDate = post.date | date: "%Y" %}
   {% if currentDate != myDate %}
       {% unless forloop.first %}</ul>{% endunless %}
       <h1>{{ currentDate }}</h1>
       <ul>
       {% assign myDate = currentDate %}
   {% endif %}
   <li><a href="{{site.baseurl}}{{ post.url }}"><span>{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}</a></li>
   {% if forloop.last %}</ul>{% endif %}
   {% endfor %}
</div>
