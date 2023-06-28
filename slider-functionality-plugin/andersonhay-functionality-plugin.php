<?php
/**
 * Plugin Name: kopen Functionality Plugin
 * Plugin URI: https://LANETERRALEVER.com
 * Description: CPT and other API functionalities
 * Version: 1.0.0
 * Author: LANETERRALEVER
 * Author URI: https://LANETERRALEVER.com
 * Text Domain: kopen
 *
 * @package kopen
 */

if ( ! defined( 'KOPVEN_FUNCTIONALITY_PLUGIN_VERSION' ) ) {
	define( 'KOPVEN_FUNCTIONALITY_PLUGIN_VERSION', '1.0.0' );
}

if ( ! defined( 'KOPVEN_FUNCTIONALITY_PLUGIN_DIR' ) ) {
	define( 'KOPVEN_FUNCTIONALITY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'KOPVEN_FUNCTIONALITY_ROOT_FILE' ) ) {
	define( 'KOPVEN_FUNCTIONALITY_ROOT_FILE', __FILE__ );
}

if ( ! defined( 'KOPVEN_FUNCTIONALITY_PLUGIN_INC_DIR' ) ) {
	define( 'KOPVEN_FUNCTIONALITY_PLUGIN_INC_DIR', KOPVEN_FUNCTIONALITY_PLUGIN_DIR . '/includes/' );
}

if ( ! defined( 'KOPVEN_FUNCTIONALITY_PLUGIN_URL' ) ) {
	define( 'KOPVEN_FUNCTIONALITY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

/**
 * Create object for kopen Functionality Plugin for calling the functionality files.
 *
 * @since 1.0.0
 */
class Kopen_Functionality_Plugin {

	/**
	 * Constructor of the Class.
	 */
	public function __construct() {
		// Elementor Widgets.
		include_once KOPVEN_FUNCTIONALITY_PLUGIN_INC_DIR . 'elementor-widgets.php';		

	}

}

// plugin init.
$Kopen_functionality_plugin = new Kopen_Functionality_Plugin();
