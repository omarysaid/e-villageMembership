package Auth.Authentification.Repository;
import Auth.Authentification.Entity.Leader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeaderRepository extends JpaRepository<Leader, Long> {
    public boolean existsById(Integer id);
}
