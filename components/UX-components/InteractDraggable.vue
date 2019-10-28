<template>
  <div
    ref="interactElement"
    :class="{ 'vue-interact-animated': interactIsAnimating }"
    :style="{
      transform: interactTransformString,
      transition: interactTransitionString
    }"
    >
    <slot />
  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

import interact from 'interact.js'

// import InteractEventBus from './interactEventBus.js'
// import { InteractEventBus } from 'vue2-interact'
// import bus from '~/plugins/eventBus.js'

export default {
  name: 'InteractDraggable',

  props: {
    interactBlockDragDown: {
      type: Boolean,
      default: false,
    },
    interactBlockDragLeft: {
      type: Boolean,
      default: false,
    },
    interactBlockDragRight: {
      type: Boolean,
      default: false,
    },
    interactBlockDragUp: {
      type: Boolean,
      default: false,
    },
    interactEventBusEvents: {
      type: Object,
      default: () => {},
    },
    interactMaxRotation: {
      type: Number,
      default: 0,
    },
    interactLockXAxis: {
      type: Boolean,
      default: false,
    },
    interactLockYAxis: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeDown: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeLeft: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeRight: {
      type: Boolean,
      default: false,
    },
    interactLockSwipeUp: {
      type: Boolean,
      default: false,
    },
    interactOutOfSightXCoordinate: {
      type: Number,
      default: 500,
    },
    interactOutOfSightYCoordinate: {
      type: Number,
      default: 1000,
    },
    interactXThreshold: {
      type: Number,
      default: 200,
    },
    interactYThreshold: {
      type: Number,
      default: 300,
    },
  },

  data() {
    return {
      interactIsAnimating: true,
      interactDragged: null,
      interactPosition: {
        x: 0,
        y: 0,
        rotation: 0,
      },
    };
  },

  computed: {

    ...mapState({
      log : state => state.log, 
      locale : state => state.locale,

      isClicking : state => state.cards.isClicking,

    }),

    interactTransformString() {
      if (!this.interactIsAnimating || this.interactDragged) {
        const { x, y, rotation } = this.interactPosition;
        return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
      }

      return null;
    },

    interactTransitionString() {
      if (this.interactIsAnimating) return 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';

      return null;
    },
  },

  watch: {
    interactEventBusEvents(val) {
      this.interactSetEventBusEvents();
    },
  },

  mounted() {

    this.interactSetEventBusEvents();

    let store = this.$store
    let setClicking = this.setIsClicking
    let setHadClick = this.setHadClick

    const element = this.$refs.interactElement

    let IsMobileOrTablet = this.$device.isMobileOrTablet

    interact(element).draggable({

      ignoreFrom : '.card-button',

      onstart: () => {
        this.interactIsAnimating = false;
      },

      onmove: (event) => {
        let x = 0;
        let y = 0;

        if (this.interactLockSwipeLeft && event.dx < 0) x = 0;
        else if (this.interactLockSwipeRight && event.dx > 0) x = 0;
        else x = this.interactLockXAxis ? 0 : (this.interactPosition.x || 0) + event.dx;

        if (this.interactLockSwipeUp && event.dy < 0) y = 0;
        else if (this.interactLockSwipeDown && event.dy > 0) y = 0;
        else y = this.interactLockYAxis ? 0 : (this.interactPosition.y || 0) + event.dy;

        let rotation = this.interactMaxRotation * (x / this.interactXThreshold);

        if (rotation > this.interactMaxRotation) rotation = this.interactMaxRotation;
        else if (rotation < -this.interactMaxRotation) rotation = -this.interactMaxRotation;

        this.interactSetPosition({ x, y, rotation });
      },

      onend: () => {
        const { x: cardPositionX, y: cardPositionY } = this.interactPosition;
        const { interactXThreshold, interactYThreshold } = this;
        this.interactIsAnimating = true;

        if (cardPositionX > interactXThreshold) this.interactDraggedRight();
        else if (cardPositionX < -interactXThreshold) this.interactDraggedLeft();
        else if (cardPositionY > interactYThreshold) this.interactDraggedDown();
        else if (cardPositionY < -interactYThreshold) this.interactDraggedUp();
        else this.interactResetCardPosition();
      },

    })

    .on('tap', function(event) {
      if ( IsMobileOrTablet ){
        setClicking( 'interactDraggable / tap' )
        setHadClick()
        event.preventDefault()
        event.stopImmediatePropagation()
        console.log('C-InteractDraggable-on-tap / event.target : ', event.target)
        event.target.__vue__.$el.click()
      }
    }, true )

    .on('click', function(event) {
      if ( !IsMobileOrTablet ){
        console.log('C-InteractDraggable-on-click / event.target : ', event.target)
        setClicking( 'interactDraggable / click' )
        event.preventDefault()
        event.stopImmediatePropagation()
        setHadClick()
        event.target.__vue__.$el.click()
      }
    }, true )

  },

  beforeDestroy() {
    interact(this.$refs.interactElement).unset();
    this.interactUnsetEventBusEvents();
  },

  methods: {

    ...mapMutations({
      setIsClicking: 'cards/setIsClicking',
      setHadClick: 'cards/setHadClick',
    }),

    interactClick() {
      this.$emit('clickDraggableBtn', event);
    },

    interactDraggedDown() {
      if (this.interactBlockDragDown) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({ y: this.interactOutOfSightYCoordinate });
      this.$emit('draggedDown');
    },

    interactDraggedLeft() {
      if (this.interactBlockDragLeft) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({
        x: -this.interactOutOfSightXCoordinate,
        rotation: -this.interactMaxRotation,
      });
      this.$emit('draggedLeft');
    },

    interactDraggedRight() {
      if (this.interactBlockDragRight) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({
        x: this.interactOutOfSightXCoordinate,
        rotation: this.interactMaxRotation,
      });
      this.$emit('draggedRight');
    },

    interactDraggedUp() {
      if (this.interactBlockDragUp) {
        this.interactResetCardPosition();
        return;
      }
      this.interactUnsetElement();
      this.interactSetPosition({ y: -this.interactOutOfSightYCoordinate });
      this.$emit('draggedUp');
    },

    interactSetEventBusEvents() {

      if (this.interactEventBusEvents) {

        if (this.interactEventBusEvents.draggedDown) {
          // InteractEventBus.$on(this.interactEventBusEvents.draggedDown, this.interactDraggedDown);
          this.$bus.$on(this.interactEventBusEvents.draggedDown, this.interactDraggedDown);
        };

        if (this.interactEventBusEvents.draggedLeft) {
          // InteractEventBus.$on(this.interactEventBusEvents.draggedLeft, this.interactDraggedLeft);
          this.$bus.$on(this.interactEventBusEvents.draggedLeft, this.interactDraggedLeft);
        };

        if (this.interactEventBusEvents.draggedRight) {
          // InteractEventBus.$on(this.interactEventBusEvents.draggedRight, this.interactDraggedRight);
          this.$bus.$on(this.interactEventBusEvents.draggedRight, this.interactDraggedRight);
        };

        if (this.interactEventBusEvents.draggedUp) {
          // InteractEventBus.$on(this.interactEventBusEvents.draggedUp, this.interactDraggedUp);
          this.$bus.$on(this.interactEventBusEvents.draggedUp, this.interactDraggedUp);
        };
      }
    },

    interactSetPosition(coordinates) {
      const {
        x = 0,
        y = 0,
        rotation = 0
      } = coordinates;

      this.interactPosition = {x, y, rotation };
    },

    interactUnsetElement() {
      interact(this.$refs.interactElement).unset();
      this.interactDragged = true;
    },

    interactUnsetEventBusEvents() {
      if (this.interactEventBusEvents) {
        if (this.interactEventBusEvents.draggedDown) {
          // InteractEventBus.$off(this.interactEventBusEvents.draggedDown, this.draggedDown);
          this.$bus.$off(this.interactEventBusEvents.draggedDown, this.draggedDown);
        };

        if (this.interactEventBusEvents.draggedLeft) {
          // InteractEventBus.$off(this.interactEventBusEvents.draggedLeft, this.draggedLeft);
          this.$bus.$off(this.interactEventBusEvents.draggedLeft, this.draggedLeft);
        };

        if (this.interactEventBusEvents.draggedRight) {
          // InteractEventBus.$off(this.interactEventBusEvents.draggedRight, this.draggedRight);
          this.$bus.$off(this.interactEventBusEvents.draggedRight, this.draggedRight);
        };

        if (this.interactEventBusEvents.draggedUp) {
          // InteractEventBus.$off(this.interactEventBusEvents.draggedUp, this.draggedUp);
          this.$bus.$off(this.interactEventBusEvents.draggedUp, this.draggedUp);
        };
      }
    },

    interactResetCardPosition() {
      this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
    }
  },
};
</script>
