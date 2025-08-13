    import '../styles/Perfil.css'; // Crea este archivo


    export const Perfil = () => {
    const jugador = JSON.parse(sessionStorage.getItem('jugador'));

    return (
        <div className="profile-container">
        <div className="row">
            <div className="col-12">
            <h1 className="page-title">Perfil del Jugador</h1>
            </div>

            <div className="col-lg-8">
            <div className="card mb-4">
                <div className="card-header">
                <h5 className="m-0">Información Básica</h5>
                </div>
                <div className="card-body">
                <form>
                    <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Nombre</label>
                    <div className="col-sm-9">
                        <input 
                        type="text" 
                        className="form-control"
                        defaultValue={jugador?.nombreJugador}
                        />
                    </div>
                    </div>

                    <div className="form-group row mt-3">
                    <label className="col-sm-3 col-form-label">Nueva Contraseña</label>
                    <div className="col-sm-9">
                        <input 
                        type="password" 
                        className="form-control"
                        placeholder="••••••••"
                        />
                    </div>
                    </div>

                    <div className="text-end mt-4">
                    <button type="submit" className="btn btn-primary px-4">
                        Guardar Cambios
                    </button>
                    </div>
                </form>
                </div>
            </div>
            </div>

            <div className="col-lg-4">
            <div className="card">
                <div className="card-header">
                <h5 className="m-0">Avatar</h5>
                </div>
                <div className="card-body text-center">
                <div className="avatar-preview mb-3">
                    <i className="fas fa-user-circle fa-5x text-gray-300"></i>
                </div>
                <button className="btn btn-outline-primary btn-sm">
                    Cambiar Imagen
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };