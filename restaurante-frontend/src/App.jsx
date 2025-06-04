function App() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/img/fondo.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-orange-600">Bienvenido al Restaurante "Chedys"</h1>
          <p className="text-gray-700">Inicia sesión para continuar</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 text-left mb-1">Usuario</label>
           <input
  type="text"
  name="usuario"
  placeholder="ej. chedy123"
  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
/>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 text-left mb-1">Contraseña</label>
           <input
  type="password"
  name="contrasena"
  placeholder="ingrese su contraseña"
  class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
/>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Iniciar Sesión
          </button>
          <div class="text-center text-sm mt-2">
  <a href="#" class="text-orange-600 hover:underline">¿Olvidaste tu contraseña?</a>
</div>


<p class="text-center text-sm mt-4">
  ¿No tienes cuenta?
  <a href="#" class="text-orange-600 font-semibold hover:underline">Regístrate</a>
</p>

        </form>
      </div>
    </div>
  );
}

export default App;
