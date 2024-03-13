package Auth.Authentification.services;

import Auth.Authentification.Entity.User;
import Auth.Authentification.dto.JwtAuthenticationResponse;
import Auth.Authentification.dto.LoginRequest;
import Auth.Authentification.dto.RefreshTokenRequest;
import Auth.Authentification.dto.SignUpRequest;

public interface AuthenticationService {
    User signup(SignUpRequest signUpRequest);
    JwtAuthenticationResponse login(LoginRequest loginRequest);

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
