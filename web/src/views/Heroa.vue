<template>
<div>
  aaa
</div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heros/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>

.page-hero .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
}

.info {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
  
.scores .badge {
  margin: 0 0.25rem;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: 0.9rem;
  text-align: center;
  border-radius: 50%;
  font-size: 0.6rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.skills img.icon {
    width: 70px;
    height: 70px;
    border: 3px solid #fff;
    border-radius: 50%;
  }

.skills img.icon.active {
  border-color:#fff;
}

.hero-items img.icon{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  
</style>
