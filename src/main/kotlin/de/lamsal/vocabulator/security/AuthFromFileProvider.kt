package de.lamsal.vocabulator.security

import de.lamsal.vocabulator.util.JsonUtil
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.io.File

@Component
class AuthFromFileProvider(
        @Value("\${authfile.filepath}") filepath: String
) : AuthenticationProvider {

    val users: Map<String, String>

    init {
        users = JsonUtil().readValue(File(filepath), Map::class.java) as Map<String, String>
    }

    override fun authenticate(authentication: Authentication): Authentication {
        return authentication
    }

    override fun supports(authentication: Class<*>?): Boolean = true

}