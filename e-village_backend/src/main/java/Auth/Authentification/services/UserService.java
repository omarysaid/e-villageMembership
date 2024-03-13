package Auth.Authentification.services;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    // New method to retrieve user role by email
    String getUserRoleByEmail(String email);
}
