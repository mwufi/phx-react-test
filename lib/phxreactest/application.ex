defmodule Phxreactest.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Telemetry supervisor
      PhxreactestWeb.Telemetry,
      # Start the Ecto repository
      Phxreactest.Repo,
      # Start the PubSub system
      {Phoenix.PubSub, name: Phxreactest.PubSub},
      # Start Finch
      {Finch, name: Phxreactest.Finch},
      # Start the Endpoint (http/https)
      PhxreactestWeb.Endpoint
      # Start a worker by calling: Phxreactest.Worker.start_link(arg)
      # {Phxreactest.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Phxreactest.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    PhxreactestWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
