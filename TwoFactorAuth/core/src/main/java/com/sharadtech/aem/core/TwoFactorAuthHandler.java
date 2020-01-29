package com.sharadtech.aem.core;

import org.osgi.service.metatype.annotations.AttributeDefinition;
import org.osgi.service.metatype.annotations.ObjectClassDefinition;

@ObjectClassDefinition(name = "SHARADTECH | Two Factor Authentication Handler Interface", description = "SHARADTECH | Two Factor Authentication Handler Interface Configuration")
public @interface TwoFactorAuthHandler {

	@AttributeDefinition(name = "Path", description = "Repository path for which this authentication handler should be used by Sling. If this is empty, the authentication handler will be disabled. (path)")
	String pathValue() default "/";

	@AttributeDefinition(name = "Default Login Page", description = "If no mappings are defined, nor no mapping matches the request, this is the default login page being redirected to. This can be overridden in the content page configuration")
	String loginPageValue() default "/libs/granite/core/content/login.html";
}