package cloud.computing.auth.domain.define.state;

import org.springframework.data.repository.CrudRepository;

public interface LoginStateRepository extends CrudRepository<LoginState, String> {
}

