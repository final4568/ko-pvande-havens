<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 *  Static Tab Slider with dropdown.
 *
 * @since 1.0.0
 */
class kopen_Main_Slider extends \Elementor\Widget_Base {

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
		return array( 'kopen-main-slider-js' );
	}

	/**
	 * Dependent Styles.
	 *
	 * @return void
	 */
	public function get_style_depends() {
		return array( 'kopen-main-slider-css' );
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
        return 'kopen-main-slider';
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
        return esc_html__( 'Main Hero Slider', 'kopen' );
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
			'kopen_main_image',
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
			'kopen_title1',
			array(
				'label'       => esc_html__( 'First Title', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'placeholder' => esc_html__( 'Enter Text', 'kopen' ),
				'default'     => esc_html__( 'First Title', 'kopen' ),
				'separator'   => 'before',
			)
		);
		$repeater->add_control(
			'kopen_title2',
			array(
				'label'       => esc_html__( 'Last Title ', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'placeholder' => esc_html__( 'Enter  Text', 'kopen' ),
				'default'     => esc_html__( 'Last Title', 'kopen' ),
				'separator'   => 'before',
			)
		);
		

		$repeater->add_control(
			'kopen_main_description',
			array(
				'label'       => esc_html__( 'Description', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::WYSIWYG,
				'default'     => esc_html__( 'Default description', 'kopen' ),
				'placeholder' => esc_html__( 'Type your description here', 'kopen' ),
			)
		);

        $repeater->add_control(
			'button1',
			array(
				'label'       => esc_html__( 'First Button Text ', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'placeholder' => esc_html__( 'Enter Button', 'kopen' ),
				'default'     => esc_html__( 'Button', 'kopen' ),
				'separator'   => 'before',
			)
		);
		$repeater->add_control(
			'kopen_url1',
			[
				'label' => esc_html__( 'Button 1 Link', 'elementor-oembed-widget' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'input_type' => 'url',
				'placeholder' => esc_html__( 'https://your-link.com', 'elementor-oembed-widget' ),
			]
		);
        $repeater->add_control(
			'button2',
			array(
				'label'       => esc_html__( 'Second Button Text ', 'kopen' ),
				'type'        => \Elementor\Controls_Manager::TEXT,
				'placeholder' => esc_html__( 'Enter Button', 'kopen' ),
				'default'     => esc_html__( 'Button', 'kopen' ),
				'separator'   => 'before',
			)
		);
		$repeater->add_control(
			'kopen_url2',
			[
				'label' => esc_html__( 'Button 2 Link', 'elementor-oembed-widget' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'input_type' => 'url',
				'placeholder' => esc_html__( 'https://your-link.com', 'elementor-oembed-widget' ),
			]
		);

		$this->add_control(
			'kopen_main_items',
			array(
				'label'   => esc_html__( 'Slider List', 'kopen' ),
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
		$lists     = isset( $settings['kopen_main_items'] ) && ! empty( $settings['kopen_main_items'] ) ? $settings['kopen_main_items'] : false;
		if ( $lists ) { ?>
        <div class="hs-main-wrpper">
        <div class="swiper hs-slider">
            <div class="swiper-wrapper">
            <?php							
			foreach ( $lists as $list ) {
			$title1        = isset( $list['kopen_title1'] ) && ! empty( $list['kopen_title1'] ) ? $list['kopen_title1'] : '';
			$title2        = isset( $list['kopen_title2'] ) && ! empty( $list['kopen_title2'] ) ? $list['kopen_title2'] : '';
			$image         = isset( $list['kopen_main_image'] ) && ! empty( $list['kopen_main_image'] ) ? $list['kopen_main_image'] : array();
			$description   = isset( $list['kopen_main_description'] ) && ! empty( $list['kopen_main_description'] ) ? $list['kopen_main_description'] : '';
			$btn1_text     = isset( $list['button1'] ) && ! empty( $list['button1'] ) ? $list['button1'] : '';
			$link1         = isset( $list['kopen_url1'] ) && ! empty( $list['kopen_url1'] ) ? $list['kopen_url1'] : '';
			$btn2_text     = isset( $list['button2'] ) && ! empty( $list['button2'] ) ? $list['button2'] : '';
			$link2         = isset( $list['kopen_url2'] ) && ! empty( $list['kopen_url2'] ) ? $list['kopen_url2'] : '';
			?>
                <div class="swiper-slide">
                <div class="hs-inner-wrapper">
                    <div class="hs-bg-img">
                        <?php
						if ( isset( $image['id'] ) ) {
							echo wp_get_attachment_image( $image['id'], 'medium_large' );
						}
						?>
                    </div>
                    <div class="hs-bg-overlay"></div>
                    <div class="hs-container">
                        <div class="hs-content-wrapper">
                        <?php if ( $title1 ) { ?>
                            <h1 class="hs-title"><span class="change-hero-color"><?php echo esc_html( $title1 ); ?></span><?php echo esc_html( $title2 ); ?> </h1>
						<?php } ?>

						<?php if ( $description ) { ?>
                        <div class="hs-description">
                            <p>
                            <?php echo wp_kses_post( $description ); ?>
                            </p>
                        </div>
						<?php } ?>
                    
                        <div class="hs-btn-wrapper dark-btn ">
                            <?php if ( $btn1_text ) { ?>
                                <a href="<?php echo $link1 ?>" class="elementor-button"><?php echo esc_html( $btn1_text ); ?></a>
                            <?php } ?>
                            <?php if ( $btn2_text ) { ?>
                                <a href="<?php echo $link2 ?>" class="elementor-button"><?php echo esc_html( $btn2_text ); ?></a>
                            <?php } ?>
                        </div>
                        </div>
                    </div>
                </div>
                </div> 
                <?php } ?>	
            </div>
            <div class="hs-controlls">
            <div class="hs-arrow-controll-next">
              
                <img src="<?php echo esc_url( KOPVEN_FUNCTIONALITY_PLUGIN_URL . 'assets/img/hs-control.svg' ); ?>" alt="arrow-next">
            </div>
            <div class="hs-arrow-controll-prev">
            <img src="<?php echo esc_url( KOPVEN_FUNCTIONALITY_PLUGIN_URL . 'assets/img/hs-control.svg' ); ?>" alt="arrow-prev">
            </div>
            <div class="swiper-pagination"></div>
            </div>
            </div>
            </div>           
            <?php
		}
    }
}

