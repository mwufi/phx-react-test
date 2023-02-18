defmodule Mix.Tasks.Webapp do
  @moduledoc """
  React frontend compilation & bundling
  """

  use Mix.Task
  require Logger

  @public_path "./priv/static/webapp"

  @shortdoc "Compile React frontend"
  def run(_) do
    Logger.info("📦 - Installing NPM packages")
    System.cmd("pnpm", ["install", "--quiet"], cd: "./frontend")

    Logger.info("⚙️  - Compiling React frontend")
    System.cmd("pnpm", ["run", "build"], cd: "./frontend")

    Logger.info("🚛 - Moving dist folder to Phoenix at #{@public_path}")
    # First clean up any stale files from previous builds if any
    System.cmd("rm", ["-rf", @public_path])
    System.cmd("cp", ["-R", "./frontend/dist", @public_path])

    Logger.info("⚛️  - React frontend ready.")
  end
end
