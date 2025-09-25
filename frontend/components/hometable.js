import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const createDummyData = () => {
  const data = [];
  for (let i = 1; i <= 56; i++) {
    data.push({
      id: i,
      name: `App Name ${i}`,
      bundleId: `com.fpt.AppName${i}`,
      description: 'Production',
      createdAt: '20 Feb 2022',
      createdBy: 'quoctx',
      updatedAt: '20 Feb 2022',
      updatedBy: 'dungt66',
    });
  }
  return data;
};

const DUMMY_DATA = createDummyData();


const TableRow = ({ item, onView, onEdit, onDelete }) => (
  <View style={styles.row}>
    <View style={[styles.cell, styles.appCell]}>
      <View style={styles.appIcon} />
      <View>
        <Text style={styles.appName}>{item.name}</Text>
        <Text style={styles.appBundleId}>{item.bundleId}</Text>
      </View>
    </View>
    <Text style={[styles.cell, { flex: 1.5 }]}>{item.description}</Text>
    <Text style={[styles.cell, { flex: 1.5 }]}>{item.createdAt}</Text>
    <Text style={[styles.cell, { flex: 1 }]}>{item.createdBy}</Text>
    <Text style={[styles.cell, { flex: 1.5 }]}>{item.updatedAt}</Text>
    <Text style={[styles.cell, { flex: 1 }]}>{item.updatedBy}</Text>
    <View style={[styles.cell, styles.actionsCell]}>
      <TouchableOpacity onPress={() => onView(item)} style={styles.actionButton}>
        <Icon name="eye" size={18} color="#6b7280" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
        <Icon name="edit-2" size={18} color="#6b7280" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item)} style={styles.actionButton}>
        <Icon name="trash-2" size={18} color="#ef4444" />
      </TouchableOpacity>
    </View>
  </View>
);

const TableHeader = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.headerText, { flex: 2.5 }]}>Ứng dụng</Text>
    <Text style={[styles.headerText, { flex: 1.5 }]}>Mô tả</Text>
    <Text style={[styles.headerText, { flex: 1.5 }]}>Ngày tạo</Text>
    <Text style={[styles.headerText, { flex: 1 }]}>Người tạo</Text>
    <Text style={[styles.headerText, { flex: 1.5 }]}>Ngày sửa</Text>
    <Text style={[styles.headerText, { flex: 1 }]}>Người sửa</Text>
    <Text style={[styles.headerText, { flex: 1.5, textAlign: 'center' }]}>Thao tác</Text>
  </View>
);

const AppTable = ({ pageSize = 8, onAdd, onView, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [viewMode, setViewMode] = useState('list');

  const filteredData = useMemo(() => {
    if (!searchText) return DUMMY_DATA;
    return DUMMY_DATA.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.bundleId.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [currentPage, pageSize, filteredData]);

  const goToNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const goToPrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Danh sách ứng dụng</Text>
        <View style={styles.viewToggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'grid' && styles.toggleButtonActive]}
            onPress={() => setViewMode('grid')}
          >
            <Icon name="grid" size={18} color={viewMode === 'grid' ? '#333' : '#888'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'list' && styles.toggleButtonActive]}
            onPress={() => setViewMode('list')}
          >
            <Icon name="menu" size={18} color={viewMode === 'list' ? '#333' : '#888'} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Tất cả</Text>
          <Icon name="chevron-down" size={20} color="#374151" />
        </TouchableOpacity>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>Thêm ứng dụng</Text>
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#9ca3af" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm"
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      </View>

      {/* Bảng dữ liệu */}
      <View style={styles.tableContainer}>
        <FlatList
          data={paginatedData}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={TableHeader}
          renderItem={({ item }) => (
            <TableRow item={item} onView={onView} onEdit={onEdit} onDelete={onDelete} />
          )}
          stickyHeaderIndices={[0]}
        />
      </View>

      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>
          Hiển thị {paginatedData.length} trong {filteredData.length} kết quả
        </Text>
        <View style={styles.paginationControls}>
          <TouchableOpacity onPress={goToPrevPage} disabled={currentPage === 1}>
            <Icon name="chevron-left" size={24} color={currentPage === 1 ? '#d1d5db' : '#374151'} />
          </TouchableOpacity>
          <Text style={styles.pageNumberText}>{currentPage}</Text>
          <TouchableOpacity onPress={goToNextPage} disabled={currentPage === totalPages}>
            <Icon name="chevron-right" size={24} color={currentPage === totalPages ? '#d1d5db' : '#374151'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AppTable;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    flex: 1,
  },
  cardHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewToggleContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
  },
  toggleButton: {
    padding: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#e5e7eb',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterText: {
    marginRight: 8,
    fontSize: 14,
    color: '#374151',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#00A2B9', 
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },


  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6', 
    borderRadius: 8,           
    paddingHorizontal: 12,    
    width: 400,
  },
  searchIcon: {
    marginRight: 8, 
  },
  searchInput: {
    height: 40,
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },

  tableContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#545557ff',
    fontWeight: '600',  
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  cell: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  appCell: {
    flex: 2.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    marginRight: 12,
  },
  appName: {
    fontWeight: '600',
    color: '#1f2937',
  },
  appBundleId: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionsCell: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: {
    padding: 6,
    marginHorizontal: 4,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  paginationText: {
    fontSize: 14,
    color: '#4b5563',
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageNumberText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 16,
    color: '#1f2937',
  },
});