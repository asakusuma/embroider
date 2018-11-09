import { Tree } from "broccoli-plugin";
import PackageCache from "./package-cache";

// The Workspace represents our directory that will contain a complete Vanilla
// Ember app. It's weird for a broccoli plugin, because we have strong opinions
// about symlinks that don't match Broccoli's. So instead of writing to our own
// assigned (temporary) output directory, we maintain our own final destination
// directory.
//
// It's still important that we particpate in the Brococli dependency graph.
// That is, later stages that depend on us must still include us as an input
// tree, even though they won't actually read from our outputDir as broccoli
// understands it.
//
// Our own broccoli build step is responsible only for assembling the proper
// node_modules structure with all our dependencies in v2 format. It leaves an
// empty place for the app's own code to go, which is filled in later via
// copyIntoApp().
export default interface Workspace extends Tree {
  clearApp(): void;
  copyIntoApp(srcPath: string): void;

  // the original (as authored) location of the app's own source on disk
  readonly appSrcDir: string;

  // the location inside the workspace where the app's code will go
  readonly appDestDir: string;

  // Optional PackageCache that allows us to save work discovering the packages
  // again in the next stage.
  readonly packageCache: PackageCache | undefined;
}
