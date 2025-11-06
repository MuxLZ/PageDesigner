<template>
  <div class="designer-container">
    <!-- 工具栏 -->
    <div class="designer-toolbar">
      <div class="toolbar-left">
        <h2>页面设计器</h2>
        <el-button type="primary" @click="saveConfig">保存配置</el-button>
        <el-button @click="exportConfig">导出配置</el-button>
        <el-button @click="importConfig">导入配置</el-button>
      </div>
      <div class="toolbar-right">
        <el-button @click="previewMode = !previewMode">
          {{ previewMode ? '编辑模式' : '预览模式' }}
        </el-button>
      </div>
    </div>

    <div class="designer-content">
      <!-- 左侧：模块库 -->
      <div v-if="!previewMode" class="designer-sidebar">
        <div class="sidebar-section">
          <div class="sidebar-section-header">
            <h3>模块库</h3>
            <el-button type="text" size="small" @click="showImportModuleDialog = true">
              <el-icon><Upload /></el-icon>
              导入模块
            </el-button>
          </div>
          <el-collapse v-model="moduleLibraryCollapse" accordion>
            <!-- 布局模块 -->
            <el-collapse-item :title="categoryNames[ModuleCategory.LAYOUT]" name="layout">
              <div class="module-library">
                <div
                  v-for="moduleType in getModulesByCategory(ModuleCategory.LAYOUT)"
                  :key="moduleType"
                  class="module-item"
                  @click="addModule(moduleType)"
                >
                  <el-icon><component :is="getModuleIcon(moduleType)" /></el-icon>
                  <span>{{ getModuleName(moduleType) }}</span>
                </div>
              </div>
            </el-collapse-item>
            
            <!-- 内容模块 -->
            <el-collapse-item :title="categoryNames[ModuleCategory.CONTENT]" name="content">
              <div class="module-library">
                <div
                  v-for="moduleType in getModulesByCategory(ModuleCategory.CONTENT)"
                  :key="moduleType"
                  class="module-item"
                  @click="addModule(moduleType)"
                >
                  <el-icon><component :is="getModuleIcon(moduleType)" /></el-icon>
                  <span>{{ getModuleName(moduleType) }}</span>
                </div>
              </div>
            </el-collapse-item>
            
            <!-- 业务模块 -->
            <el-collapse-item :title="categoryNames[ModuleCategory.BUSINESS]" name="business">
              <div class="module-library">
                <div
                  v-for="moduleType in getModulesByCategory(ModuleCategory.BUSINESS)"
                  :key="moduleType"
                  class="module-item"
                  @click="addModule(moduleType)"
                >
                  <el-icon><component :is="getModuleIcon(moduleType)" /></el-icon>
                  <span>{{ getModuleName(moduleType) }}</span>
                </div>
              </div>
            </el-collapse-item>
            
            <!-- 交互模块 -->
            <el-collapse-item :title="categoryNames[ModuleCategory.INTERACTION]" name="interaction">
              <div class="module-library">
                <div
                  v-for="moduleType in getModulesByCategory(ModuleCategory.INTERACTION)"
                  :key="moduleType"
                  class="module-item"
                  @click="addModule(moduleType)"
                >
                  <el-icon><component :is="getModuleIcon(moduleType)" /></el-icon>
                  <span>{{ getModuleName(moduleType) }}</span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <!-- 页面设置 -->
        <div class="sidebar-section">
          <h3>页面设置</h3>
          <el-form label-width="80px" size="small">
            <el-form-item label="页面名称">
              <el-input v-model="pageConfig.name" />
            </el-form-item>
            <el-form-item label="路由路径">
              <el-input v-model="pageConfig.route" />
            </el-form-item>
          </el-form>
        </div>

        <!-- 全局样式 -->
        <div class="sidebar-section">
          <h3>全局样式</h3>
          <el-form label-width="80px" size="small">
            <el-form-item label="主题色">
              <el-color-picker v-model="globalTheme.primary" />
              <div class="form-item-tip">用于按钮、链接、强调元素</div>
            </el-form-item>
            <el-form-item label="次色">
              <el-color-picker v-model="globalTheme.secondary" />
              <div class="form-item-tip">用于渐变背景、次要强调元素</div>
            </el-form-item>
            <el-form-item label="背景色">
              <el-color-picker v-model="globalTheme.background" />
              <div class="form-item-tip">页面整体背景色</div>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 中间：页面预览 -->
      <div class="designer-preview">
        <div class="preview-container">
          <PageRenderer
            :config="pageConfig"
            :selectable="!previewMode"
            :selected-module-id="selectedModule?.id"
            :is-designer="true"
            @module-select="selectModule"
          />
        </div>
      </div>

      <!-- 右侧：属性面板或模块列表 -->
      <div v-if="!previewMode" class="designer-right-panel">
        <!-- 属性面板 -->
        <div v-if="selectedModule" class="designer-properties">
        <div class="properties-header">
          <h3>{{ selectedModule.name }} - 属性设置</h3>
          <el-button type="danger" size="small" @click="deleteModule">删除模块</el-button>
        </div>

        <div class="properties-content">
          <!-- 基础设置 -->
          <el-collapse v-model="activeCollapse">
            <el-collapse-item title="基础设置" name="basic">
              <el-form label-width="100px" size="small">
                <el-form-item label="模块名称">
                  <el-input v-model="selectedModule.name" />
                </el-form-item>
                <el-form-item label="是否显示">
                  <el-switch v-model="selectedModule.visible" />
                </el-form-item>
                <el-form-item label="排序">
                  <el-input-number v-model="selectedModule.order" :min="0" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <!-- 样式设置 -->
            <el-collapse-item title="样式设置" name="style">
              <el-form label-width="100px" size="small">
                <el-form-item label="背景色">
                  <el-color-picker v-model="selectedModule.style.backgroundColor" />
                </el-form-item>
                <el-form-item label="内边距">
                  <el-input v-model="selectedModule.style.padding" placeholder="例: 20px" />
                </el-form-item>
                <el-form-item label="外边距">
                  <el-input v-model="selectedModule.style.margin" placeholder="例: 20px" />
                </el-form-item>
                <el-form-item label="字体大小">
                  <el-input v-model="selectedModule.style.font.size" placeholder="例: 16px" />
                </el-form-item>
                <el-form-item label="字体颜色">
                  <el-color-picker v-model="selectedModule.style.font.color" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <!-- 动画效果 -->
            <el-collapse-item title="动画效果" name="effect">
              <el-form label-width="100px" size="small">
                <el-form-item label="效果类型">
                  <el-select v-model="selectedModule.effect.type" placeholder="选择效果">
                    <el-option label="淡入淡出" value="fade" />
                    <el-option label="缩放" value="zoom" />
                    <el-option label="旋转" value="rotate" />
                  </el-select>
                </el-form-item>
                <el-form-item label="持续时间">
                  <el-input-number v-model="selectedModule.effect.duration" :min="0" />
                </el-form-item>
                <el-form-item label="延迟">
                  <el-input-number v-model="selectedModule.effect.delay" :min="0" />
                </el-form-item>
              </el-form>
            </el-collapse-item>

            <!-- 模块特定配置 -->
            <el-collapse-item title="模块配置" name="module">
              <div v-if="selectedModule">
                <!-- 轮播模块配置 -->
                <div v-if="selectedModule.type === 'carousel'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="轮播高度">
                      <el-input v-model="(selectedModule as any).height" />
                    </el-form-item>
                    <el-form-item label="自动播放">
                      <el-switch v-model="(selectedModule as any).autoplay" />
                    </el-form-item>
                    <el-form-item label="播放间隔(ms)">
                      <el-input-number v-model="(selectedModule as any).interval" :min="1000" />
                    </el-form-item>
                    <el-form-item label="显示指示器">
                      <el-switch v-model="(selectedModule as any).indicator" />
                    </el-form-item>
                    <el-form-item label="显示箭头">
                      <el-switch v-model="(selectedModule as any).arrows" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>幻灯片列表</h4>
                      <el-button type="primary" size="small" @click="addCarouselSlide">添加幻灯片</el-button>
                    </div>
                    <div v-for="(slide, index) in (selectedModule as any).slides" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>幻灯片 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeCarouselSlide(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标题">
                            <el-input v-model="slide.title" />
                          </el-form-item>
                          <el-form-item label="副标题">
                            <el-input v-model="slide.subtitle" type="textarea" :rows="2" />
                          </el-form-item>
                          <el-form-item label="内容">
                            <el-input v-model="slide.content" type="textarea" :rows="2" />
                          </el-form-item>
                          <el-form-item label="背景图">
                            <el-input v-model="slide.background" placeholder="图片URL" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 宫格模块配置 -->
                <div v-if="selectedModule.type === 'grid'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="12" />
                    </el-form-item>
                    <el-form-item label="间距">
                      <el-input v-model="(selectedModule as any).gap" placeholder="例: 30px" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>项目列表</h4>
                      <el-button type="primary" size="small" @click="addGridItem">添加项目</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>项目 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeGridItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标题">
                            <el-input v-model="item.title" />
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="item.description" type="textarea" :rows="2" />
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-input v-model="item.image" placeholder="图片URL" />
                          </el-form-item>
                          <el-form-item label="图标">
                            <el-input v-model="item.icon" placeholder="图标名称" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="item.link" placeholder="链接地址" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 时间轴模块配置 -->
                <div v-if="selectedModule.type === 'timeline'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="布局方式">
                      <el-select v-model="(selectedModule as any).layout">
                        <el-option label="垂直" value="vertical" />
                        <el-option label="水平" value="horizontal" />
                        <el-option label="交替" value="alternate" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="线条颜色">
                      <el-color-picker v-model="(selectedModule as any).lineColor" />
                    </el-form-item>
                    <el-form-item label="标记颜色">
                      <el-color-picker v-model="(selectedModule as any).markerColor" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>时间点列表</h4>
                      <el-button type="primary" size="small" @click="addTimelineItem">添加时间点</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>时间点 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeTimelineItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="年份">
                            <el-input v-model="item.year" />
                          </el-form-item>
                          <el-form-item label="标题">
                            <el-input v-model="item.title" />
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="item.description" type="textarea" :rows="3" />
                          </el-form-item>
                          <el-form-item label="图标">
                            <el-input v-model="item.icon" placeholder="图标名称" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 统计模块配置 -->
                <div v-if="selectedModule.type === 'stats'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="6" />
                    </el-form-item>
                    <el-form-item label="背景色">
                      <el-color-picker v-model="(selectedModule as any).backgroundColor" />
                    </el-form-item>
                    <el-form-item label="文字颜色">
                      <el-color-picker v-model="(selectedModule as any).textColor" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>统计数据列表</h4>
                      <el-button type="primary" size="small" @click="addStatsItem">添加统计项</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>统计项 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeStatsItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="数字">
                            <el-input v-model="item.number" />
                          </el-form-item>
                          <el-form-item label="标签">
                            <el-input v-model="item.label" />
                          </el-form-item>
                          <el-form-item label="前缀">
                            <el-input v-model="item.prefix" placeholder="例: ¥" />
                          </el-form-item>
                          <el-form-item label="后缀">
                            <el-input v-model="item.suffix" placeholder="例: + 或 %" />
                          </el-form-item>
                          <el-form-item label="图标">
                            <el-input v-model="item.icon" placeholder="图标名称" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 分栏模块配置 -->
                <div v-if="selectedModule.type === 'column'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="布局方式">
                      <el-select v-model="(selectedModule as any).layout">
                        <el-option label="左图右文" value="left-image" />
                        <el-option label="右图左文" value="right-image" />
                        <el-option label="交替" value="alternate" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="间距">
                      <el-input v-model="(selectedModule as any).gap" placeholder="例: 60px" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>栏目列表</h4>
                      <el-button type="primary" size="small" @click="addColumnItem">添加栏目</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>栏目 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeColumnItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标题">
                            <el-input v-model="item.title" />
                          </el-form-item>
                          <el-form-item label="内容">
                            <el-input v-model="item.content" type="textarea" :rows="4" />
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-input v-model="item.image" placeholder="图片URL" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 导航栏模块配置 -->
                <div v-if="selectedModule.type === 'header'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="固定导航">
                      <el-switch v-model="(selectedModule as any).fixed" />
                    </el-form-item>
                    <el-form-item label="透明背景">
                      <el-switch v-model="(selectedModule as any).transparent" />
                    </el-form-item>
                    <el-form-item label="背景色">
                      <el-color-picker v-model="(selectedModule as any).backgroundColor" />
                    </el-form-item>
                  </el-form>
                  <el-divider>Logo设置</el-divider>
                  <el-form label-width="100px" size="small">
                    <el-form-item label="显示Logo">
                      <el-switch 
                        v-model="(selectedModule as any).logo.visible" 
                        :active-value="true"
                        :inactive-value="false"
                        @change="ensureLogoConfig"
                      />
                      <div class="form-item-tip">控制Logo是否显示</div>
                    </el-form-item>
                    <el-form-item label="Logo位置">
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <el-button 
                          :type="getLogoPosition(selectedModule) === 'nav' ? 'primary' : 'default'"
                          size="small"
                          @click="setLogoPosition('nav')"
                        >
                          {{ getLogoPosition(selectedModule) === 'nav' ? '✓ 主导航栏' : '主导航栏' }}
                        </el-button>
                        <el-button 
                          :type="getLogoPosition(selectedModule) === 'top' ? 'primary' : 'default'"
                          size="small"
                          @click="setLogoPosition('top')"
                        >
                          {{ getLogoPosition(selectedModule) === 'top' ? '✓ 顶部栏' : '顶部栏' }}
                        </el-button>
                      </div>
                      <div class="form-item-tip">
                        当前：{{ getLogoPosition(selectedModule) === 'nav' ? '与主导航栏同行' : '与顶部联系栏同行' }}
                      </div>
                    </el-form-item>
                    <el-form-item label="Logo文字">
                      <el-input v-model="(selectedModule as any).logo.text" />
                    </el-form-item>
                    <el-form-item label="Logo图片">
                      <el-input v-model="(selectedModule as any).logo.image" placeholder="图片URL" />
                    </el-form-item>
                    <el-form-item label="Logo链接">
                      <el-input v-model="(selectedModule as any).logo.link" placeholder="链接地址" />
                    </el-form-item>
                  </el-form>
                  <el-divider>顶部联系栏</el-divider>
                  <el-form label-width="100px" size="small">
                    <el-form-item :label="getTopBarLabel(selectedModule)">
                      <el-switch v-model="(selectedModule as any).topBar.visible" />
                      <div class="form-item-tip">
                        {{ getTopBarTip(selectedModule) }}
                      </div>
                    </el-form-item>
                    <el-form-item label="联系信息位置">
                      <el-radio-group v-model="(selectedModule as any).topBar.position" size="small">
                        <el-radio label="left">左侧</el-radio>
                        <el-radio label="center">中间</el-radio>
                        <el-radio label="right">右侧</el-radio>
                      </el-radio-group>
                      <div class="form-item-tip">
                        {{ getTopBarPositionTip(selectedModule) }}
                      </div>
                    </el-form-item>
                    <el-form-item label="背景色">
                      <el-color-picker v-model="(selectedModule as any).topBar.backgroundColor" />
                    </el-form-item>
                    <el-form-item label="文字颜色">
                      <el-color-picker v-model="(selectedModule as any).topBar.textColor" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>联系信息</h4>
                      <el-button type="primary" size="small" @click="addTopBarItem">添加信息</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).topBar?.items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>信息 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeTopBarItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="图标">
                            <el-input v-model="item.icon" placeholder="图标名称" />
                          </el-form-item>
                          <el-form-item label="文本">
                            <el-input v-model="item.text" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                  <el-divider>导航菜单</el-divider>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>菜单项</h4>
                      <el-button type="primary" size="small" @click="addMenuItem">添加菜单</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).menu?.items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>菜单 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeMenuItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标签">
                            <el-input v-model="item.label" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="item.link" />
                          </el-form-item>
                          <el-form-item label="下拉菜单">
                            <el-switch v-model="item.hasDropdown" @change="toggleMenuItemDropdown(item, index)" />
                          </el-form-item>
                        </el-form>
                        <div v-if="item.children && item.children.length > 0" class="section-links">
                          <div class="items-header">
                            <span>下拉菜单项</span>
                            <el-button type="primary" size="small" @click="addDropdownItem(index)">添加子菜单</el-button>
                          </div>
                          <div v-for="(child, childIndex) in item.children" :key="childIndex" class="link-item">
                            <el-input v-model="child.label" placeholder="子菜单标签" style="width: 40%; margin-right: 5%" />
                            <el-input v-model="child.link" placeholder="子菜单链接" style="width: 40%; margin-right: 5%" />
                            <el-button type="danger" text size="small" @click="removeDropdownItem(index, childIndex)">删除</el-button>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 页脚模块配置 -->
                <div v-if="selectedModule.type === 'footer'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="背景色">
                      <el-color-picker v-model="(selectedModule as any).backgroundColor" />
                    </el-form-item>
                    <el-form-item label="文字颜色">
                      <el-color-picker v-model="(selectedModule as any).textColor" />
                    </el-form-item>
                    <el-form-item label="版权信息">
                      <el-input v-model="(selectedModule as any).copyright" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>页脚区块</h4>
                      <el-button type="primary" size="small" @click="addFooterSection">添加区块</el-button>
                    </div>
                    <div v-for="(section, index) in (selectedModule as any).sections" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>区块 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeFooterSection(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标题">
                            <el-input v-model="section.title" />
                          </el-form-item>
                          <el-form-item label="内容">
                            <el-input v-model="section.content" type="textarea" :rows="3" />
                          </el-form-item>
                        </el-form>
                        <div v-if="section.links" class="section-links">
                          <div class="items-header">
                            <span>链接列表</span>
                            <el-button type="primary" size="small" @click="addFooterLink(index)">添加链接</el-button>
                          </div>
                          <div v-for="(link, linkIndex) in section.links" :key="linkIndex" class="link-item">
                            <el-input v-model="link.text" placeholder="链接文本" style="width: 45%; margin-right: 5%" />
                            <el-input v-model="link.link" placeholder="链接地址" style="width: 45%; margin-right: 5%" />
                            <el-button type="danger" text size="small" @click="removeFooterLink(index, linkIndex)">删除</el-button>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 页面头部配置 -->
                <div v-if="selectedModule.type === 'page-hero'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="背景色">
                      <el-color-picker v-model="(selectedModule as any).backgroundColor" />
                    </el-form-item>
                    <el-form-item label="背景图">
                      <el-input v-model="(selectedModule as any).backgroundImage" placeholder="图片URL" />
                    </el-form-item>
                    <el-form-item label="文字颜色">
                      <el-color-picker v-model="(selectedModule as any).textColor" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>面包屑导航</h4>
                      <el-button type="primary" size="small" @click="addBreadcrumbItem">添加项</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).breadcrumb" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>项 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeBreadcrumbItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标签">
                            <el-input v-model="item.label" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="item.link" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 特性列表配置 -->
                <div v-if="selectedModule.type === 'feature-list'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="布局方式">
                      <el-select v-model="(selectedModule as any).layout">
                        <el-option label="水平" value="horizontal" />
                        <el-option label="垂直" value="vertical" />
                        <el-option label="网格" value="grid" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="6" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>特性列表</h4>
                      <el-button type="primary" size="small" @click="addFeatureItem">添加特性</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>特性 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeFeatureItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="图标">
                            <el-input v-model="item.icon" placeholder="图标名称" />
                          </el-form-item>
                          <el-form-item label="标题">
                            <el-input v-model="item.title" />
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="item.description" type="textarea" :rows="2" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 卡片列表配置 -->
                <div v-if="selectedModule.type === 'card-list'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="12" />
                    </el-form-item>
                    <el-form-item label="卡片样式">
                      <el-select v-model="(selectedModule as any).cardStyle">
                        <el-option label="默认" value="default" />
                        <el-option label="悬停" value="hover" />
                        <el-option label="简约" value="minimal" />
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>卡片列表</h4>
                      <el-button type="primary" size="small" @click="addCardListItem">添加卡片</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>卡片 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeCardListItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标题">
                            <el-input v-model="item.title" />
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="item.description" type="textarea" :rows="2" />
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-input v-model="item.image" placeholder="图片URL" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="item.link" placeholder="链接地址" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 图文混排配置 -->
                <div v-if="selectedModule.type === 'text-image'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="内容">
                      <el-input v-model="(selectedModule as any).content" type="textarea" :rows="4" />
                    </el-form-item>
                    <el-form-item label="图片">
                      <el-input v-model="(selectedModule as any).image" placeholder="图片URL" />
                    </el-form-item>
                    <el-form-item label="布局方式">
                      <el-select v-model="(selectedModule as any).layout">
                        <el-option label="左图右文" value="left-image" />
                        <el-option label="右图左文" value="right-image" />
                        <el-option label="上图下文" value="top-image" />
                        <el-option label="下图上文" value="bottom-image" />
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>按钮列表</h4>
                      <el-button type="primary" size="small" @click="addTextImageButton">添加按钮</el-button>
                    </div>
                    <div v-for="(btn, index) in (selectedModule as any).buttons" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>按钮 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeTextImageButton(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="文本">
                            <el-input v-model="btn.text" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="btn.link" />
                          </el-form-item>
                          <el-form-item label="类型">
                            <el-select v-model="btn.type">
                              <el-option label="主要" value="primary" />
                              <el-option label="次要" value="secondary" />
                            </el-select>
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 联系表单配置 -->
                <div v-if="selectedModule.type === 'contact-form'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="提交按钮文字">
                      <el-input v-model="(selectedModule as any).submitText" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>表单字段</h4>
                      <el-button type="primary" size="small" @click="addFormField">添加字段</el-button>
                    </div>
                    <div v-for="(field, index) in (selectedModule as any).fields" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>字段 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeFormField(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="字段名">
                            <el-input v-model="field.name" />
                          </el-form-item>
                          <el-form-item label="标签">
                            <el-input v-model="field.label" />
                          </el-form-item>
                          <el-form-item label="类型">
                            <el-select v-model="field.type">
                              <el-option label="文本" value="text" />
                              <el-option label="邮箱" value="email" />
                              <el-option label="电话" value="tel" />
                              <el-option label="文本域" value="textarea" />
                              <el-option label="下拉" value="select" />
                            </el-select>
                          </el-form-item>
                          <el-form-item label="占位符">
                            <el-input v-model="field.placeholder" />
                          </el-form-item>
                          <el-form-item label="必填">
                            <el-switch v-model="field.required" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 行动号召配置 -->
                <div v-if="selectedModule.type === 'cta'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="背景色">
                      <el-color-picker v-model="(selectedModule as any).backgroundColor" />
                    </el-form-item>
                    <el-form-item label="背景图">
                      <el-input v-model="(selectedModule as any).backgroundImage" placeholder="图片URL" />
                    </el-form-item>
                    <el-form-item label="文字颜色">
                      <el-color-picker v-model="(selectedModule as any).textColor" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>按钮列表</h4>
                      <el-button type="primary" size="small" @click="addCTAButton">添加按钮</el-button>
                    </div>
                    <div v-for="(btn, index) in (selectedModule as any).buttons" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>按钮 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeCTAButton(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="文本">
                            <el-input v-model="btn.text" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="btn.link" />
                          </el-form-item>
                          <el-form-item label="类型">
                            <el-select v-model="btn.type">
                              <el-option label="主要" value="primary" />
                              <el-option label="次要" value="secondary" />
                            </el-select>
                          </el-form-item>
                          <el-form-item label="图标">
                            <el-input v-model="btn.icon" placeholder="图标名称" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 产品展示配置 -->
                <div v-if="selectedModule.type === 'products'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="12" />
                    </el-form-item>
                    <el-form-item label="显示更多">
                      <el-switch v-model="(selectedModule as any).showMore" />
                    </el-form-item>
                    <el-form-item v-if="(selectedModule as any).showMore" label="更多链接">
                      <el-input v-model="(selectedModule as any).moreLink" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>产品列表</h4>
                      <el-button type="primary" size="small" @click="addProductItem">添加产品</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>产品 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeProductItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="名称">
                            <el-input v-model="item.name" />
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="item.description" type="textarea" :rows="2" />
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-input v-model="item.image" placeholder="图片URL" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="item.link" placeholder="链接地址" />
                          </el-form-item>
                        </el-form>
                        <div v-if="item.features" class="section-links">
                          <div class="items-header">
                            <span>特性标签</span>
                            <el-button type="primary" size="small" @click="addProductFeature(index)">添加特性</el-button>
                          </div>
                          <div v-for="(feature, featureIndex) in item.features" :key="featureIndex" class="link-item">
                            <el-input v-model="item.features[featureIndex]" placeholder="特性文本" style="width: 85%; margin-right: 5%" />
                            <el-button type="danger" text size="small" @click="removeProductFeature(index, featureIndex)">删除</el-button>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 新闻资讯配置 -->
                <div v-if="selectedModule.type === 'news'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="12" />
                    </el-form-item>
                    <el-form-item label="显示更多">
                      <el-switch v-model="(selectedModule as any).showMore" />
                    </el-form-item>
                    <el-form-item v-if="(selectedModule as any).showMore" label="更多链接">
                      <el-input v-model="(selectedModule as any).moreLink" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>新闻列表</h4>
                      <el-button type="primary" size="small" @click="addNewsItem">添加新闻</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>新闻 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeNewsItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标题">
                            <el-input v-model="item.title" />
                          </el-form-item>
                          <el-form-item label="摘要">
                            <el-input v-model="item.excerpt" type="textarea" :rows="2" />
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-input v-model="item.image" placeholder="图片URL" />
                          </el-form-item>
                          <el-form-item label="分类">
                            <el-input v-model="item.category" />
                          </el-form-item>
                          <el-form-item label="日期">
                            <el-input v-model="item.date" />
                          </el-form-item>
                          <el-form-item label="作者">
                            <el-input v-model="item.author" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="item.link" placeholder="链接地址" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 合作伙伴配置 -->
                <div v-if="selectedModule.type === 'partners'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="12" />
                    </el-form-item>
                    <el-form-item label="灰度显示">
                      <el-switch v-model="(selectedModule as any).grayscale" />
                    </el-form-item>
                    <el-form-item label="悬停效果">
                      <el-switch v-model="(selectedModule as any).hoverEffect" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>合作伙伴列表</h4>
                      <el-button type="primary" size="small" @click="addPartnerItem">添加合作伙伴</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>合作伙伴 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removePartnerItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="名称">
                            <el-input v-model="item.name" />
                          </el-form-item>
                          <el-form-item label="Logo">
                            <el-input v-model="item.logo" placeholder="Logo URL" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="item.link" placeholder="链接地址" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 团队介绍配置 -->
                <div v-if="selectedModule.type === 'team'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="6" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>团队成员列表</h4>
                      <el-button type="primary" size="small" @click="addTeamMember">添加成员</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>成员 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeTeamMember(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="姓名">
                            <el-input v-model="item.name" />
                          </el-form-item>
                          <el-form-item label="职位">
                            <el-input v-model="item.position" />
                          </el-form-item>
                          <el-form-item label="简介">
                            <el-input v-model="item.bio" type="textarea" :rows="3" />
                          </el-form-item>
                          <el-form-item label="头像">
                            <el-input v-model="item.avatar" placeholder="头像URL" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 资质荣誉配置 -->
                <div v-if="selectedModule.type === 'honors'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="列数">
                      <el-input-number v-model="(selectedModule as any).columns" :min="1" :max="6" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>荣誉列表</h4>
                      <el-button type="primary" size="small" @click="addHonorItem">添加荣誉</el-button>
                    </div>
                    <div v-for="(item, index) in (selectedModule as any).items" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>荣誉 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeHonorItem(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标题">
                            <el-input v-model="item.title" />
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-input v-model="item.image" placeholder="图片URL" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 解决方案配置 -->
                <div v-if="selectedModule.type === 'solutions'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                    <el-form-item label="默认标签">
                      <el-input v-model="(selectedModule as any).activeTab" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>解决方案标签</h4>
                      <el-button type="primary" size="small" @click="addSolutionTab">添加标签</el-button>
                    </div>
                    <div v-for="(tab, index) in (selectedModule as any).tabs" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>标签 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeSolutionTab(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="标签名">
                            <el-input v-model="tab.name" />
                          </el-form-item>
                          <el-form-item label="标题">
                            <el-input v-model="tab.title" />
                          </el-form-item>
                          <el-form-item label="描述">
                            <el-input v-model="tab.description" type="textarea" :rows="3" />
                          </el-form-item>
                          <el-form-item label="图片">
                            <el-input v-model="tab.image" placeholder="图片URL" />
                          </el-form-item>
                        </el-form>
                        <div v-if="tab.benefits" class="section-links">
                          <div class="items-header">
                            <span>优势列表</span>
                            <el-button type="primary" size="small" @click="addSolutionBenefit(index)">添加优势</el-button>
                          </div>
                          <div v-for="(benefit, benefitIndex) in tab.benefits" :key="benefitIndex" class="link-item">
                            <el-input v-model="tab.benefits[benefitIndex]" placeholder="优势描述" style="width: 85%; margin-right: 5%" />
                            <el-button type="danger" text size="small" @click="removeSolutionBenefit(index, benefitIndex)">删除</el-button>
                          </div>
                        </div>
                      </el-card>
                    </div>
                  </div>
                </div>

                <!-- 联系我们配置 -->
                <div v-if="selectedModule.type === 'contact'" class="module-config-content">
                  <el-form label-width="100px" size="small">
                    <el-form-item label="标题">
                      <el-input v-model="(selectedModule as any).title" />
                    </el-form-item>
                    <el-form-item label="副标题">
                      <el-input v-model="(selectedModule as any).subtitle" />
                    </el-form-item>
                  </el-form>
                  <div class="content-items">
                    <div class="items-header">
                      <h4>按钮列表</h4>
                      <el-button type="primary" size="small" @click="addContactButton">添加按钮</el-button>
                    </div>
                    <div v-for="(btn, index) in (selectedModule as any).buttons" :key="index" class="content-item">
                      <el-card shadow="hover" class="item-card">
                        <template #header>
                          <div class="item-header">
                            <span>按钮 {{ index + 1 }}</span>
                            <el-button type="danger" text size="small" @click="removeContactButton(index)">删除</el-button>
                          </div>
                        </template>
                        <el-form label-width="80px" size="small">
                          <el-form-item label="文本">
                            <el-input v-model="btn.text" />
                          </el-form-item>
                          <el-form-item label="链接">
                            <el-input v-model="btn.link" />
                          </el-form-item>
                          <el-form-item label="类型">
                            <el-select v-model="btn.type">
                              <el-option label="主要" value="primary" />
                              <el-option label="次要" value="secondary" />
                            </el-select>
                          </el-form-item>
                          <el-form-item label="图标">
                            <el-input v-model="btn.icon" placeholder="图标名称" />
                          </el-form-item>
                        </el-form>
                      </el-card>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        </div>

        <!-- 模块列表 -->
        <div class="designer-module-list">
          <div class="module-list-header">
            <h3>模块列表</h3>
            <el-button
              v-if="selectedModule"
              type="text"
              size="small"
              @click="selectedModule = null"
            >
              取消选择
            </el-button>
          </div>
          <div class="module-list">
            <div
              v-for="(module, index) in sortedModules"
              :key="module.id"
              class="module-list-item"
              :class="{ active: selectedModule?.id === module.id }"
              @click="selectModule(module)"
            >
              <div class="module-item-info">
                <div class="module-sort-buttons">
                  <el-button
                    type="text"
                    size="small"
                    :disabled="index === 0"
                    @click.stop="moveModuleUp(index)"
                    title="上移"
                  >
                    <el-icon><ArrowUp /></el-icon>
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    :disabled="index === sortedModules.length - 1"
                    @click.stop="moveModuleDown(index)"
                    title="下移"
                  >
                    <el-icon><ArrowDown /></el-icon>
                  </el-button>
                </div>
                <el-icon><component :is="getModuleIcon(module.type)" /></el-icon>
                <span>{{ module.name }}</span>
              </div>
              <div class="module-item-actions">
                <el-switch v-model="module.visible" size="small" @click.stop />
                <el-button type="text" size="small" @click.stop="deleteModuleById(module.id)">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 导入模块对话框 -->
    <el-dialog
      v-model="showImportModuleDialog"
      title="导入自定义模块"
      width="600px"
    >
      <div class="import-module-guide">
        <el-alert
          title="模块导入说明"
          type="info"
          :closable="false"
          style="margin-bottom: 20px;"
        >
          <template #default>
            <div style="line-height: 1.8;">
              <p>您可以导入自定义模块到设计器中。模块包应为 JSON 格式。</p>
              <p>请参考 <a href="#" @click.stop.prevent="openModuleGuide">模块扩展指南</a> 了解如何创建模块包。</p>
            </div>
          </template>
        </el-alert>

        <el-upload
          ref="uploadRef"
          :auto-upload="false"
          :on-change="handleModuleFileChange"
          :file-list="moduleFileList"
          accept=".json"
          drag
        >
          <el-icon class="el-icon--upload"><UploadFilled /></el-icon>
          <div class="el-upload__text">
            将模块包文件拖到此处，或<em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              只能上传 JSON 格式的模块包文件
            </div>
          </template>
        </el-upload>

        <el-divider>或者手动添加</el-divider>

        <el-button type="primary" @click="showImportGuide = true">
          <el-icon><Document /></el-icon>
          查看导入指南
        </el-button>
      </div>

      <template #footer>
        <el-button @click="showImportModuleDialog = false">取消</el-button>
        <el-button type="primary" @click="importModule" :disabled="!modulePackage">导入</el-button>
      </template>
    </el-dialog>

    <!-- 导入指南对话框 -->
    <el-dialog
      v-model="showImportGuide"
      title="模块导入指南"
      width="800px"
    >
      <div class="import-guide-content">
        <h3>快速开始</h3>
        <ol>
          <li>在页面设计器中，点击"模块库" → "导入模块"</li>
          <li>选择或上传模块配置文件（JSON 格式）</li>
          <li>系统会自动验证并显示导入指南</li>
        </ol>

        <h3>模块包格式</h3>
        <pre><code>{{ modulePackageExample }}</code></pre>

        <h3>详细步骤</h3>
        <p>请参考 <a href="/docs/MODULE_EXTENSION_GUIDE.md" target="_blank">模块扩展指南</a> 了解完整的模块开发流程。</p>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ModuleImporter } from '@/core/ModuleImporter'
import type { ModulePackage } from '@/core/ModuleImporter'
import { Edit, ArrowUp, ArrowDown, Upload, Document } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { PageConfig, ModuleConfig } from '@/types/module'
import { ModuleType, ModuleCategory } from '@/types/module'
import { ConfigGenerator } from '@/core/ConfigGenerator'
import { StyleSystem } from '@/core/StyleSystem'
import PageRenderer from '@/core/PageRenderer.vue'
import { getModulesByCategory, getModuleName, getModuleIcon, categoryNames } from '@/utils/moduleHelper'

// 页面配置
const pageConfig = ref<PageConfig>(ConfigGenerator.generateDefaultPageConfig('新页面', '/new-page'))

// 选中的模块
const selectedModule = ref<ModuleConfig | null>(null)

// 预览模式
const previewMode = ref(false)

// 折叠面板
const activeCollapse = ref(['basic', 'style', 'effect', 'module'])

// 模块库折叠面板
const moduleLibraryCollapse = ref(['layout'])

// 导入模块相关
const showImportModuleDialog = ref(false)
const showImportGuide = ref(false)
const moduleFileList = ref<any[]>([])
const modulePackage = ref<ModulePackage | null>(null)
const uploadRef = ref()

const modulePackageExample = `{
  "moduleType": "my-custom-module",
  "moduleName": "我的自定义模块",
  "moduleCategory": "content",
  "moduleIcon": "Box",
  "defaultConfig": {
    "title": "默认标题",
    "content": "默认内容"
  },
  "componentPath": "@/components/modules/MyCustomModule.vue",
  "version": "1.0.0",
  "description": "模块描述",
  "author": "作者名称"
}`

// 处理模块文件上传
const handleModuleFileChange = (file: any) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const packageData = ModuleImporter.importModulePackageFromJSON(e.target?.result as string)
      const validation = ModuleImporter.validateModulePackage(packageData)
      
      if (validation.valid) {
        modulePackage.value = packageData
        ElMessage.success('模块包格式验证通过')
      } else {
        ElMessage.error(`模块包验证失败：${validation.errors.join(', ')}`)
        modulePackage.value = null
      }
    } catch (error: any) {
      ElMessage.error(`读取文件失败：${error.message}`)
      modulePackage.value = null
    }
  }
  reader.readAsText(file.raw)
}

// 导入模块
const importModule = async () => {
  if (!modulePackage.value) {
    ElMessage.warning('请先上传模块包文件')
    return
  }

  const guide = ModuleImporter.generateImportGuide(modulePackage.value)
  
  await ElMessageBox.alert(guide, '模块导入指南', {
    confirmButtonText: '我已了解',
    type: 'info',
    dangerouslyUseHTMLString: false
  })

  ElMessage.info('请按照上述步骤手动完成模块导入，或查看模块扩展指南获取详细说明')
  showImportModuleDialog.value = false
}

// 打开模块指南
const openModuleGuide = () => {
  // 可以打开新窗口或显示文档
  window.open('/docs/MODULE_EXTENSION_GUIDE.md', '_blank')
}

// 全局主题
const globalTheme = computed({
  get: () => pageConfig.value.globalStyle?.theme || StyleSystem.createDefaultTheme(),
  set: (val) => {
    if (!pageConfig.value.globalStyle) {
      pageConfig.value.globalStyle = {}
    }
    pageConfig.value.globalStyle.theme = val
    // 应用主题到CSS变量
    StyleSystem.applyThemeToCSS(val)
  }
})

// 监听主题变化并应用
watch(() => globalTheme.value, (newTheme) => {
  StyleSystem.applyThemeToCSS(newTheme)
}, { deep: true, immediate: true })

// 页面加载时初始化主题
onMounted(() => {
  // 确保主题被应用
  const theme = pageConfig.value.globalStyle?.theme || StyleSystem.createDefaultTheme()
  StyleSystem.applyThemeToCSS(theme)
})

// 排序后的模块
const sortedModules = computed(() => {
  return ConfigGenerator.sortModules(pageConfig.value.modules)
})

// 添加模块
const addModule = (type: ModuleType) => {
  const defaultConfig = ConfigGenerator.generateDefaultModuleConfig(type, getModuleName(type))
  const newModule: ModuleConfig = {
    ...defaultConfig,
    id: `module-${type}-${Date.now()}`,
    order: pageConfig.value.modules.length,
    style: {
      backgroundColor: '',
      padding: StyleSystem.createSpacingConfig({ top: '20px', bottom: '20px' }),
      margin: StyleSystem.createSpacingConfig({ top: '0', bottom: '0' }),
      font: StyleSystem.createFontConfig()
    },
    effect: {
      type: 'fade' as any,
      duration: 600,
      delay: 0,
      enabled: true
    }
  } as ModuleConfig
  
  pageConfig.value.modules.push(newModule)
  selectModule(newModule)
  ElMessage.success(`已添加${getModuleName(type)}模块`)
}

// 选择模块
const selectModule = (module: ModuleConfig) => {
  // 从模块数组中获取最新的模块引用，确保响应式
  const moduleIndex = pageConfig.value.modules.findIndex(m => m.id === module.id)
  if (moduleIndex > -1) {
    selectedModule.value = pageConfig.value.modules[moduleIndex]
  } else {
    selectedModule.value = module
  }
}

// 删除模块
const deleteModule = () => {
  if (selectedModule.value) {
    deleteModuleById(selectedModule.value.id)
  }
}

// 根据ID删除模块
const deleteModuleById = (id: string) => {
  const index = pageConfig.value.modules.findIndex(m => m.id === id)
  if (index > -1) {
    pageConfig.value.modules.splice(index, 1)
    if (selectedModule.value?.id === id) {
      selectedModule.value = null
    }
    ElMessage.success('模块已删除')
  }
}

// 上移模块
const moveModuleUp = (index: number) => {
  if (index <= 0) return
  
  const modules = [...pageConfig.value.modules]
  const sorted = ConfigGenerator.sortModules(modules)
  
  // 交换位置
  const temp = sorted[index]
  sorted[index] = sorted[index - 1]
  sorted[index - 1] = temp
  
  // 更新order属性
  sorted.forEach((module, idx) => {
    module.order = idx
  })
  
  pageConfig.value.modules = sorted
  ElMessage.success('模块已上移')
}

// 下移模块
const moveModuleDown = (index: number) => {
  const modules = [...pageConfig.value.modules]
  const sorted = ConfigGenerator.sortModules(modules)
  
  if (index >= sorted.length - 1) return
  
  // 交换位置
  const temp = sorted[index]
  sorted[index] = sorted[index + 1]
  sorted[index + 1] = temp
  
  // 更新order属性
  sorted.forEach((module, idx) => {
    module.order = idx
  })
  
  pageConfig.value.modules = sorted
  ElMessage.success('模块已下移')
}

// 更新模块配置
const updateModuleConfig = (updates: Partial<ModuleConfig>) => {
  if (selectedModule.value) {
    Object.assign(selectedModule.value, updates)
  }
}

// 轮播模块 - 添加幻灯片
const addCarouselSlide = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CAROUSEL) {
    const module = selectedModule.value as any
    if (!module.slides) module.slides = []
    module.slides.push({
      title: '新幻灯片',
      subtitle: '副标题',
      background: 'https://picsum.photos/1920/1080?random=' + Date.now()
    })
    ElMessage.success('已添加幻灯片')
  }
}

// 轮播模块 - 删除幻灯片
const removeCarouselSlide = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CAROUSEL) {
    const module = selectedModule.value as any
    module.slides.splice(index, 1)
    ElMessage.success('已删除幻灯片')
  }
}

// 宫格模块 - 添加项目
const addGridItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.GRID) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      title: '新项目',
      description: '项目描述',
      image: 'https://picsum.photos/400/300?random=' + Date.now()
    })
    ElMessage.success('已添加项目')
  }
}

// 宫格模块 - 删除项目
const removeGridItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.GRID) {
    const module = selectedModule.value as any
    module.items.splice(index, 1)
    ElMessage.success('已删除项目')
  }
}

// 时间轴模块 - 添加时间点
const addTimelineItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.TIMELINE) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      year: new Date().getFullYear().toString(),
      title: '新事件',
      description: '事件描述'
    })
    ElMessage.success('已添加时间点')
  }
}

// 时间轴模块 - 删除时间点
const removeTimelineItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.TIMELINE) {
    const module = selectedModule.value as any
    module.items.splice(index, 1)
    ElMessage.success('已删除时间点')
  }
}

// 统计模块 - 添加统计项
const addStatsItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.STATS) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      number: '0',
      label: '新统计项'
    })
    ElMessage.success('已添加统计项')
  }
}

// 统计模块 - 删除统计项
const removeStatsItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.STATS) {
    const module = selectedModule.value as any
    module.items.splice(index, 1)
    ElMessage.success('已删除统计项')
  }
}

// 分栏模块 - 添加栏目
const addColumnItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.COLUMN) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      title: '新栏目',
      content: '栏目内容',
      image: 'https://picsum.photos/600/400?random=' + Date.now()
    })
    ElMessage.success('已添加栏目')
  }
}

// 分栏模块 - 删除栏目
const removeColumnItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.COLUMN) {
    const module = selectedModule.value as any
    module.items.splice(index, 1)
    ElMessage.success('已删除栏目')
  }
}

// 导航栏模块 - 确保Logo配置存在
const ensureLogoConfig = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (!module.logo) {
      module.logo = { visible: true, position: 'nav' }
    }
    // 如果visible未定义，设置为true（向后兼容）
    if (module.logo.visible === undefined) {
      module.logo.visible = true
    }
    // 如果position未定义，设置为nav（向后兼容）
    if (!module.logo.position) {
      module.logo.position = 'nav'
    }
  }
}

// 导航栏模块 - 获取Logo位置
const getLogoPosition = (module: any) => {
  if (!module || module.type !== ModuleType.HEADER || !module.logo) {
    return 'nav'
  }
  return module.logo.position || 'nav'
}

// 导航栏模块 - 设置Logo位置
const setLogoPosition = (position: 'nav' | 'top') => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (!module.logo) {
      module.logo = { visible: true, position: 'nav' }
    }
    const currentPosition = getLogoPosition(module)
    if (currentPosition !== position) {
      module.logo.position = position
      ElMessage.success(`Logo已切换到${position === 'nav' ? '主导航栏' : '顶部栏'}`)
    }
  }
}

// 导航栏模块 - 获取顶部栏标签文字
const getTopBarLabel = (module: any) => {
  if (!module || module.type !== ModuleType.HEADER) {
    return '显示顶部栏'
  }
  const logoPosition = getLogoPosition(module)
  if (logoPosition === 'top') {
    return '显示联系信息'
  }
  return '显示顶部栏'
}

// 导航栏模块 - 获取顶部栏提示文字
const getTopBarTip = (module: any) => {
  if (!module || module.type !== ModuleType.HEADER) {
    return '控制顶部联系栏的显示'
  }
  const logoPosition = getLogoPosition(module)
  if (logoPosition === 'top') {
    return 'Logo在顶部栏显示时，此开关控制联系信息的显示'
  }
  return '控制顶部联系栏的显示'
}

// 导航栏模块 - 获取顶部栏位置提示文字
const getTopBarPositionTip = (module: any) => {
  if (!module || module.type !== ModuleType.HEADER) {
    return '控制联系信息在顶部栏的位置'
  }
  const logoPosition = getLogoPosition(module)
  if (logoPosition === 'top') {
    return 'Logo在顶部时，选择左侧会将联系信息放在Logo右侧，不会覆盖Logo'
  }
  return '控制联系信息在顶部栏的位置（左侧、中间、右侧）'
}

// 导航栏模块 - 添加顶部栏信息
const addTopBarItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (!module.topBar) module.topBar = { visible: true, items: [] }
    if (!module.topBar.items) module.topBar.items = []
    module.topBar.items.push({
      icon: 'Phone',
      text: '新信息'
    })
    ElMessage.success('已添加联系信息')
  }
}

// 导航栏模块 - 删除顶部栏信息
const removeTopBarItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (module.topBar && module.topBar.items) {
      module.topBar.items.splice(index, 1)
      ElMessage.success('已删除联系信息')
    }
  }
}

// 导航栏模块 - 添加菜单项
const addMenuItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (!module.menu) module.menu = { items: [] }
    if (!module.menu.items) module.menu.items = []
    module.menu.items.push({
      label: '新菜单',
      link: '/',
      hasDropdown: false,
      children: []
    })
    ElMessage.success('已添加菜单项')
  }
}

// 导航栏模块 - 切换菜单项下拉菜单
const toggleMenuItemDropdown = (item: any, index: number) => {
  if (item.hasDropdown) {
    if (!item.children) {
      item.children = [
        { label: '子菜单1', link: '/' },
        { label: '子菜单2', link: '/' }
      ]
    }
  } else {
    // 保留children数组，但可以通过UI控制是否显示
    // 如果children为空，则移除hasDropdown标记
    if (!item.children || item.children.length === 0) {
      item.hasDropdown = false
    }
  }
}

// 导航栏模块 - 添加下拉菜单项
const addDropdownItem = (menuIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (module.menu && module.menu.items && module.menu.items[menuIndex]) {
      if (!module.menu.items[menuIndex].children) {
        module.menu.items[menuIndex].children = []
      }
      module.menu.items[menuIndex].children.push({
        label: '新子菜单',
        link: '/'
      })
      module.menu.items[menuIndex].hasDropdown = true
      ElMessage.success('已添加子菜单项')
    }
  }
}

// 导航栏模块 - 删除下拉菜单项
const removeDropdownItem = (menuIndex: number, childIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (module.menu && module.menu.items && module.menu.items[menuIndex] && module.menu.items[menuIndex].children) {
      module.menu.items[menuIndex].children.splice(childIndex, 1)
      if (module.menu.items[menuIndex].children.length === 0) {
        module.menu.items[menuIndex].hasDropdown = false
        module.menu.items[menuIndex].children = []
      }
      ElMessage.success('已删除子菜单项')
    }
  }
}

// 导航栏模块 - 删除菜单项
const removeMenuItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HEADER) {
    const module = selectedModule.value as any
    if (module.menu && module.menu.items) {
      module.menu.items.splice(index, 1)
      ElMessage.success('已删除菜单项')
    }
  }
}

// 页脚模块 - 添加区块
const addFooterSection = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.FOOTER) {
    const module = selectedModule.value as any
    if (!module.sections) module.sections = []
    module.sections.push({
      title: '新区块',
      links: []
    })
    ElMessage.success('已添加区块')
  }
}

// 页脚模块 - 删除区块
const removeFooterSection = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.FOOTER) {
    const module = selectedModule.value as any
    module.sections.splice(index, 1)
    ElMessage.success('已删除区块')
  }
}

// 页脚模块 - 添加链接
const addFooterLink = (sectionIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.FOOTER) {
    const module = selectedModule.value as any
    if (module.sections && module.sections[sectionIndex]) {
      if (!module.sections[sectionIndex].links) {
        module.sections[sectionIndex].links = []
      }
      module.sections[sectionIndex].links.push({
        text: '新链接',
        link: '/'
      })
      ElMessage.success('已添加链接')
    }
  }
}

// 页脚模块 - 删除链接
const removeFooterLink = (sectionIndex: number, linkIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.FOOTER) {
    const module = selectedModule.value as any
    if (module.sections && module.sections[sectionIndex] && module.sections[sectionIndex].links) {
      module.sections[sectionIndex].links.splice(linkIndex, 1)
      ElMessage.success('已删除链接')
    }
  }
}

// 页面头部模块 - 添加面包屑项
const addBreadcrumbItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PAGE_HERO) {
    const module = selectedModule.value as any
    if (!module.breadcrumb) module.breadcrumb = []
    module.breadcrumb.push({ label: '新项', link: '' })
    ElMessage.success('已添加面包屑项')
  }
}

// 页面头部模块 - 删除面包屑项
const removeBreadcrumbItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PAGE_HERO) {
    const module = selectedModule.value as any
    if (module.breadcrumb) {
      module.breadcrumb.splice(index, 1)
      ElMessage.success('已删除面包屑项')
    }
  }
}

// 特性列表模块 - 添加特性
const addFeatureItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.FEATURE_LIST) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({ icon: 'Star', title: '新特性', description: '特性描述' })
    ElMessage.success('已添加特性')
  }
}

// 特性列表模块 - 删除特性
const removeFeatureItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.FEATURE_LIST) {
    const module = selectedModule.value as any
    if (module.items) {
      module.items.splice(index, 1)
      ElMessage.success('已删除特性')
    }
  }
}

// 卡片列表模块 - 添加卡片
const addCardListItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CARD_LIST) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      title: '新卡片',
      description: '卡片描述',
      image: 'https://picsum.photos/400/300?random=' + Date.now()
    })
    ElMessage.success('已添加卡片')
  }
}

// 卡片列表模块 - 删除卡片
const removeCardListItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CARD_LIST) {
    const module = selectedModule.value as any
    if (module.items) {
      module.items.splice(index, 1)
      ElMessage.success('已删除卡片')
    }
  }
}

// 图文混排模块 - 添加按钮
const addTextImageButton = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.TEXT_IMAGE) {
    const module = selectedModule.value as any
    if (!module.buttons) module.buttons = []
    module.buttons.push({ text: '新按钮', type: 'primary', link: '/' })
    ElMessage.success('已添加按钮')
  }
}

// 图文混排模块 - 删除按钮
const removeTextImageButton = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.TEXT_IMAGE) {
    const module = selectedModule.value as any
    if (module.buttons) {
      module.buttons.splice(index, 1)
      ElMessage.success('已删除按钮')
    }
  }
}

// 联系表单模块 - 添加字段
const addFormField = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CONTACT_FORM) {
    const module = selectedModule.value as any
    if (!module.fields) module.fields = []
    module.fields.push({
      name: 'field' + Date.now(),
      label: '新字段',
      type: 'text',
      placeholder: '请输入',
      required: false
    })
    ElMessage.success('已添加字段')
  }
}

// 联系表单模块 - 删除字段
const removeFormField = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CONTACT_FORM) {
    const module = selectedModule.value as any
    if (module.fields) {
      module.fields.splice(index, 1)
      ElMessage.success('已删除字段')
    }
  }
}

// 行动号召模块 - 添加按钮
const addCTAButton = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CTA) {
    const module = selectedModule.value as any
    if (!module.buttons) module.buttons = []
    module.buttons.push({ text: '新按钮', type: 'primary', link: '/' })
    ElMessage.success('已添加按钮')
  }
}

// 行动号召模块 - 删除按钮
const removeCTAButton = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CTA) {
    const module = selectedModule.value as any
    if (module.buttons) {
      module.buttons.splice(index, 1)
      ElMessage.success('已删除按钮')
    }
  }
}

// 产品模块 - 添加产品
const addProductItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PRODUCTS) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      name: '新产品',
      description: '产品描述',
      image: 'https://picsum.photos/400/300?random=' + Date.now(),
      features: []
    })
    ElMessage.success('已添加产品')
  }
}

// 产品模块 - 删除产品
const removeProductItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PRODUCTS) {
    const module = selectedModule.value as any
    if (module.items) {
      module.items.splice(index, 1)
      ElMessage.success('已删除产品')
    }
  }
}

// 产品模块 - 添加特性
const addProductFeature = (productIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PRODUCTS) {
    const module = selectedModule.value as any
    if (module.items && module.items[productIndex]) {
      if (!module.items[productIndex].features) {
        module.items[productIndex].features = []
      }
      module.items[productIndex].features.push('新特性')
      ElMessage.success('已添加特性')
    }
  }
}

// 产品模块 - 删除特性
const removeProductFeature = (productIndex: number, featureIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PRODUCTS) {
    const module = selectedModule.value as any
    if (module.items && module.items[productIndex] && module.items[productIndex].features) {
      module.items[productIndex].features.splice(featureIndex, 1)
      ElMessage.success('已删除特性')
    }
  }
}

// 新闻模块 - 添加新闻
const addNewsItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.NEWS) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      title: '新新闻',
      excerpt: '新闻摘要',
      image: 'https://picsum.photos/400/250?random=' + Date.now(),
      category: '分类',
      date: new Date().toISOString().split('T')[0],
      author: '作者'
    })
    ElMessage.success('已添加新闻')
  }
}

// 新闻模块 - 删除新闻
const removeNewsItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.NEWS) {
    const module = selectedModule.value as any
    if (module.items) {
      module.items.splice(index, 1)
      ElMessage.success('已删除新闻')
    }
  }
}

// 合作伙伴模块 - 添加合作伙伴
const addPartnerItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PARTNERS) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      name: '新合作伙伴',
      logo: 'https://via.placeholder.com/120x60/f0f0f0/333333?text=Logo'
    })
    ElMessage.success('已添加合作伙伴')
  }
}

// 合作伙伴模块 - 删除合作伙伴
const removePartnerItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.PARTNERS) {
    const module = selectedModule.value as any
    if (module.items) {
      module.items.splice(index, 1)
      ElMessage.success('已删除合作伙伴')
    }
  }
}

// 团队模块 - 添加成员
const addTeamMember = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.TEAM) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      name: '新成员',
      position: '职位',
      bio: '成员简介',
      avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70)
    })
    ElMessage.success('已添加成员')
  }
}

// 团队模块 - 删除成员
const removeTeamMember = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.TEAM) {
    const module = selectedModule.value as any
    if (module.items) {
      module.items.splice(index, 1)
      ElMessage.success('已删除成员')
    }
  }
}

// 荣誉模块 - 添加荣誉
const addHonorItem = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HONORS) {
    const module = selectedModule.value as any
    if (!module.items) module.items = []
    module.items.push({
      title: '新荣誉',
      image: 'https://via.placeholder.com/200x200/1e3a8a/ffffff?text=荣誉'
    })
    ElMessage.success('已添加荣誉')
  }
}

// 荣誉模块 - 删除荣誉
const removeHonorItem = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.HONORS) {
    const module = selectedModule.value as any
    if (module.items) {
      module.items.splice(index, 1)
      ElMessage.success('已删除荣誉')
    }
  }
}

// 解决方案模块 - 添加标签
const addSolutionTab = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.SOLUTIONS) {
    const module = selectedModule.value as any
    if (!module.tabs) module.tabs = []
    module.tabs.push({
      name: '新方案',
      title: '方案标题',
      description: '方案描述',
      benefits: [],
      image: 'https://picsum.photos/500/350?random=' + Date.now()
    })
    ElMessage.success('已添加标签')
  }
}

// 解决方案模块 - 删除标签
const removeSolutionTab = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.SOLUTIONS) {
    const module = selectedModule.value as any
    if (module.tabs) {
      module.tabs.splice(index, 1)
      ElMessage.success('已删除标签')
    }
  }
}

// 解决方案模块 - 添加优势
const addSolutionBenefit = (tabIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.SOLUTIONS) {
    const module = selectedModule.value as any
    if (module.tabs && module.tabs[tabIndex]) {
      if (!module.tabs[tabIndex].benefits) {
        module.tabs[tabIndex].benefits = []
      }
      module.tabs[tabIndex].benefits.push('新优势')
      ElMessage.success('已添加优势')
    }
  }
}

// 解决方案模块 - 删除优势
const removeSolutionBenefit = (tabIndex: number, benefitIndex: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.SOLUTIONS) {
    const module = selectedModule.value as any
    if (module.tabs && module.tabs[tabIndex] && module.tabs[tabIndex].benefits) {
      module.tabs[tabIndex].benefits.splice(benefitIndex, 1)
      ElMessage.success('已删除优势')
    }
  }
}

// 联系我们模块 - 添加按钮
const addContactButton = () => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CONTACT) {
    const module = selectedModule.value as any
    if (!module.buttons) module.buttons = []
    module.buttons.push({ text: '新按钮', type: 'primary', link: '/contact' })
    ElMessage.success('已添加按钮')
  }
}

// 联系我们模块 - 删除按钮
const removeContactButton = (index: number) => {
  if (selectedModule.value && selectedModule.value.type === ModuleType.CONTACT) {
    const module = selectedModule.value as any
    if (module.buttons) {
      module.buttons.splice(index, 1)
      ElMessage.success('已删除按钮')
    }
  }
}


// 保存配置
const saveConfig = () => {
  // 保存到本地存储或后端
  localStorage.setItem('pageConfig', JSON.stringify(pageConfig.value))
  ElMessage.success('配置已保存')
}

// 导出配置
const exportConfig = () => {
  const json = ConfigGenerator.exportConfig(pageConfig.value)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${pageConfig.value.name}.json`
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('配置已导出')
}

// 导入配置
const importConfig = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/json'
  input.onchange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        try {
          const config = ConfigGenerator.importConfig(e.target.result)
          pageConfig.value = config as PageConfig
          ElMessage.success('配置已导入')
        } catch (error) {
          ElMessage.error('导入失败：配置文件格式错误')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

</script>

<style scoped>
.designer-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.designer-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.toolbar-left h2 {
  margin: 0;
  font-size: 1.25rem;
}

.designer-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.designer-sidebar {
  width: 280px;
  background: white;
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
  padding: 20px;
}

.sidebar-section {
  margin-bottom: 30px;
}

.sidebar-section h3 {
  font-size: 1rem;
  margin-bottom: 15px;
  color: var(--dark-color);
}

.form-item-tip {
  font-size: 0.75rem;
  color: var(--gray-color);
  margin-top: 5px;
  line-height: 1.4;
}

.module-library {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.module-item:hover {
  background: var(--light-color);
  border-color: var(--primary-color);
}

.designer-preview {
  flex: 1;
  overflow-y: auto;
  background: #f5f5f5;
  padding: 20px;
}

.preview-container {
  max-width: 100%;
  margin: 0 auto;
  /* 背景色由 PageRenderer 的 pageStyles 控制，不在这里设置固定白色 */
  min-height: 100%;
}

.designer-right-panel {
  width: 320px;
  background: white;
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.designer-properties {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.properties-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.properties-header h3 {
  font-size: 1rem;
  margin: 0;
}

.properties-content {
  /* 属性面板内容样式 */
}

.module-config-content {
  padding: 10px 0;
}

.content-items {
  margin-top: 20px;
}

.items-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.items-header h4 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dark-color);
}

.content-item {
  margin-bottom: 15px;
}

.item-card {
  margin-bottom: 10px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-links {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
}

.link-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 5px;
}

.designer-module-list {
  border-top: 1px solid var(--border-color);
  max-height: 300px;
  overflow-y: auto;
  padding: 20px;
  background: var(--light-color);
}

.module-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.module-list-header h3 {
  font-size: 1rem;
  margin: 0;
  color: var(--dark-color);
}

.module-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.module-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.module-list-item:hover {
  background: var(--light-color);
}

.module-list-item.active {
  border-color: var(--primary-color);
  background: var(--light-color);
}

.module-item-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.module-sort-buttons {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-right: 5px;
}

.module-sort-buttons .el-button {
  padding: 2px 4px;
  min-height: auto;
  height: 18px;
  line-height: 1;
}

.module-sort-buttons .el-button.is-disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.module-item-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.sidebar-section-header h3 {
  margin: 0;
}

.import-module-guide {
  padding: 10px 0;
}

.import-guide-content {
  line-height: 1.8;
}

.import-guide-content h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  color: var(--primary-color);
}

.import-guide-content ol {
  padding-left: 20px;
}

.import-guide-content pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
}

.import-guide-content code {
  color: #333;
}
</style>

