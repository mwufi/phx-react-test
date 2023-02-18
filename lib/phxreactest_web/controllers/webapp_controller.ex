defmodule PhxreactestWeb.WebappController do
  use PhxreactestWeb, :controller

  def index(conn, _params) do
    conn
    |> put_resp_content_type("text/html")
    |> send_resp(200, render_react_app())
  end

  def test_api(conn, _params) do
    conn
    |> json(%{message: "Hello from Phoenix!"})
  end

  def render_react_app() do
    Application.app_dir(:phxreactest, "priv/static/webapp/index.html")
    |> File.read!()
  end
end
