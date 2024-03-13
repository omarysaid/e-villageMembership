package Auth.Authentification.Repository;

import Auth.Authentification.Entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WardRepository extends JpaRepository<Ward, Long> {
    public boolean existsById(Integer id);
}
