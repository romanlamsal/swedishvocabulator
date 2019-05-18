package de.lamsal.vocabulator.security

import de.lamsal.vocabulator.util.JsonUtil
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.AuthenticationProvider
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.io.File
import java.nio.charset.StandardCharsets
import java.security.MessageDigest

@Component
class AuthFromFileProvider(
        @Value("\${authfile.filepath}") filepath: String
) : AuthenticationProvider {

    val users: Map<*, *> = JsonUtil().readValue(File(filepath), Map::class.java)

    private fun String.toSha256() = MessageDigest.getInstance("SHA-256")
            .digest(this.toByteArray(StandardCharsets.UTF_8))
            .fold("") { str, it -> str + "%02x".format(it) }

    override fun authenticate(authentication: Authentication): Authentication? {
        if (users[authentication.principal] != authentication.credentials)
            throw BadCredentialsException("Invalid username/password.")
        return UsernamePasswordAuthenticationToken(authentication.principal, authentication.credentials, emptyList())
    }

    override fun supports(authentication: Class<*>): Boolean = true
}