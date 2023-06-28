<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 *  Static Tab Slider with dropdown.
 *
 * @since 1.0.0
 */
class Kopen_Tab_Slider extends \Elementor\Widget_Base {

	/**
	 * The constructor.
	 *
	 * @param array $data The class data parsing through.
	 * @param array $args The arguments.
	 */
	public function __construct( $data = array(), $args = null ) {
		parent::__construct( $data, $args );
	}

	/**
	 * Dependent Scripts.
	 *
	 * @return void
	 */
	public function get_script_depends() {
		return array( 'anderson-hay-tab-slider-js' );
	}

	/**
	 * Dependent Styles.
	 *
	 * @return void
	 */
	public function get_style_depends() {
		return array( 'anderson-hay-tab-slider-css' );
	}
    /**
     * Get widget name.
     *
     * Retrieve widget name.
     *
     * @since 1.0.0
     * @access public
     * @return string Widget name.
     */
    public function get_name() {
        return 'anderson-hay-tab-slider';
    }

    /**
     * Get widget title.
     *
     * Retrieve widget title.
     *
     * @since 1.0.0
     * @access public
     * @return string Widget title.
     */
    public function get_title() {
        return esc_html__( 'kopen Tab Slider', 'kopen' );
    }

    /**
     * Get widget icon.
     *
     * Retrieve widget icon.
     *
     * @since 1.0.0
     * @access public
     * @return string Widget icon.
     */
    public function get_icon() {
        return 'eicon-tabs';
    }

    /**
     * Get widget categories.
     *
     * Register the widget in our own custom category.
     *
     * @since 1.0.0
     * @access public
     * @return array Widget categories.
     */
    public function get_categories() {
        return array( 'kopen_widgets' );
    }

    /**
     * Register widget controls.
     *
     * Add input fields to allow the user to customize the widget settings.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function register_controls() {

        $this->start_controls_section(
            'content_section',
            array(
                'label' => __( 'Content', 'kopen' ),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            )
        );
		$repeater = new \Elementor\Repeater();

		$repeater->add_control(
			'kopen_image',
				array(
					'label'       => esc_html__( 'Main Image', 'kopen' ),
					'type'        => \Elementor\Controls_Manager::MEDIA,
					'default'     => array(
						'url' => \Elementor\Utils::get_placeholder_image_src(),
					),
					'separator'   => 'before',
				)
		);


		// Control for link text.
		$repeater->add_control(
			'kopen_title',
			array(
				'label'       => esc_html__( 'Dish Name', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'placeholder' => esc_html__( 'Enter Link Text', 'kopen' ),
				'default'     => esc_html__( 'Demo Dish Name', 'kopen' ),
				'separator'   => 'before',
			)
		);

		$repeater->add_control(
			'kopen_price',
			array(
				'label'       => esc_html__( 'Price', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'placeholder' => esc_html__( 'Enter Link Text', 'kopen' ),
				'default'     => esc_html__( 'Demo Sub-Text', 'kopen' ),
				'separator'   => 'before',
			)
		);

		$repeater->add_control(
			'kopen_description',
			array(
				'label'       => esc_html__( 'Description', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::WYSIWYG,
				'default'     => esc_html__( 'Default description', 'kopen' ),
				'placeholder' => esc_html__( 'Type your description here', 'kopen' ),
			)
		);
		$repeater->add_control(
			'kopen_url',
			[
				'label' => esc_html__( 'Button Link', 'elementor-oembed-widget' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'input_type' => 'url',
				'placeholder' => esc_html__( 'https://your-link.com', 'elementor-oembed-widget' ),
			]
		);

		$this->add_control(
			'kopen_items',
			array(
				'label'   => esc_html__( 'Dishes List', 'kopen' ),
				'type'    => \Elementor\Controls_Manager::REPEATER,
				'fields'  => $repeater->get_controls(),
			)
		);

        $this->end_controls_section();

    }

    /**
     * Render course format widget output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @since 1.0.0
     * @access protected
     */
    protected function render() {
		$settings  = $this->get_settings_for_display();
		$lists     = isset( $settings['kopen_items'] ) && ! empty( $settings['kopen_items'] ) ? $settings['kopen_items'] : false;
		if ( $lists ) { ?>


		<div class="fav-food-main-wrapper">
			<div class="container">
				<div class="swiper fav-Food-swiper">
            <div class="swiper-wrapper">
			<?php							
			foreach ( $lists as $list ) {
			$title       = isset( $list['kopen_title'] ) && ! empty( $list['kopen_title'] ) ? $list['kopen_title'] : '';
			$price   	 = isset( $list['kopen_price'] ) && ! empty( $list['kopen_price'] ) ? $list['kopen_price'] : '';
			$image       = isset( $list['kopen_image'] ) && ! empty( $list['kopen_image'] ) ? $list['kopen_image'] : array();
			$description = isset( $list['kopen_description'] ) && ! empty( $list['kopen_description'] ) ? $list['kopen_description'] : '';
			$link = isset( $list['kopen_url'] ) && ! empty( $list['kopen_url'] ) ? $list['kopen_url'] : '';
			?>
              <div class="swiper-slide">
                <div class="fav-slide-image-wrapper">
                    <div href="" class="fav-slide-image-container">
						<?php
						if ( isset( $image['id'] ) ) {
							echo wp_get_attachment_image( $image['id'], 'medium_large' );
						}
						?>
					</div>
                    <div class="fav-slide-image-overlay"></div>
                </div>
                <div class="fav-slide-content-wrapper">
                    <div class="title-price-wrapper">
                        <div class="fav-slide-title">
						<?php if ( $title ) { ?>
							<h4 class="main-heading"><?php echo esc_html( $title ); ?></h4>
						<?php } ?>
						</div>
                        <div class="price">
							<?php if ( $price ) { ?>
								<div class="sub-heading"><?php echo wp_kses_post( $price ); ?>$</div>
							<?php } ?></div>
                    </div>
                    <div class="fav-slide-description">
                        <p>
						<?php if ( $description ) { ?>
							<div class="tab-content"><?php echo wp_kses_post( $description ); ?></div>
						<?php } ?>
						</p>
                    </div>
					<?php if ( $title ) { ?>
						<div class="dark-btn">
						  <a href="<?php echo esc_html( $link ); ?>" target="_blank" class="elementor-button elementor-size-xs">Order Now</a>
						</div> 
					<?php } ?>
                    
                </div>
              </div>
			  <?php } ?>		
            </div>
            <div class="swiper-pagination"></div>
          </div>
    </div>
</div>
			<?php
		}
    }
}
