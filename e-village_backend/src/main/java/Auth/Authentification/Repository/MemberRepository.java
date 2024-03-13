package Auth.Authentification.Repository;


import Auth.Authentification.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    public boolean existsById(Integer id);
}
