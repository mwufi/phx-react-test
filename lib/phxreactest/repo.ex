defmodule Phxreactest.Repo do
  use Ecto.Repo,
    otp_app: :phxreactest,
    adapter: Ecto.Adapters.Postgres
end
