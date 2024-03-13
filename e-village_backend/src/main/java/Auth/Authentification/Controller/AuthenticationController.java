package Auth.Authentification.Controller; // Add the missing package statement

import Auth.Authentification.Entity.User;
import Auth.Authentification.dto.JwtAuthenticationResponse;
import Auth.Authentification.dto.LoginRequest;
import Auth.Authentification.dto.RefreshTokenRequest;
import Auth.Authentification.dto.SignUpRequest;
import Auth.Authentification.services.AuthenticationService;
import Auth.Authentification.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final UserService userService; // Add UserService field

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody SignUpRequest signUpRequest){
        return  ResponseEntity.ok(authenticationService.signup(signUpRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@RequestBody LoginRequest loginRequest){
        JwtAuthenticationResponse response = authenticationService.login(loginRequest);

        // Retrieve user's role
        String role = userService.getUserRoleByEmail(loginRequest.getEmail()); // Correct method call

        // Add role to JwtAuthenticationResponse
        response.setRole(role);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return  ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }
}
